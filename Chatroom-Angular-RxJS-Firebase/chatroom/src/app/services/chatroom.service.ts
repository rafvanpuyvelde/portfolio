import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {Injectable, OnDestroy} from '@angular/core';
import { Chat } from '../components/chat/Chat';
import { IChatroomService } from './IChatroomService';
import {AngularFireDatabase, AngularFireList, AngularFireAction} from '@angular/fire/database';
import {UserService} from "./user.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ChatroomService implements IChatroomService, OnDestroy {
  activeChat: Chat;
  activeChatKey: string;
  chats: Observable<Chat[]>;

  private chatsRef: AngularFireList<Chat>;
  private chatObserver: Subscription;

  constructor(private db: AngularFireDatabase, private userService: UserService, private router: Router) {
    this.chatsRef = db.list<Chat>('chats');

    this.chats = this.chatsRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
  }

  ngOnDestroy(): void {
    this.chatObserver.unsubscribe();
  }

  async createChatGroup(chatGroupName: string) {
    const { uid } = await this.userService.user;

    const newChat = new Chat(chatGroupName, uid);
    this.chatsRef.push(newChat)
      .then(async () => {
        await this.updateChatroomGroups(newChat);
        await this.updateChatroomUsers(newChat);
      });
  }

  async deleteChatGroup(key: string) {
    await this.chatsRef.remove(key);
    //await this.db.list('groups').remove(key);
    await this.router.navigate(['/chatroom']);
  }

  async addMessageToActiveChatGroup(chatKey: string, message: string) {
    console.log(`Message '${message}' added to chat: ${this.activeChat.name}`);
    const messageTimestamp: number = + new Date();

    this.db.list(`messages/${this.activeChat.name}`).push({
      authorUid: this.userService.uid,
      text: message,
      timestamp: messageTimestamp
    }).then(async () => {
      await this.updateChat(chatKey, message, messageTimestamp);
    });
  }

  private async updateChat(key: string, lastMessage: string, messageTimestamp: number) {
    await this.db.list('chats').update(key, {
      lastMessage: lastMessage,
      nameOfLastSender: this.userService.displayName,
      timestamp: messageTimestamp
    });
  }

  private async updateChatroomUsers(chat: Chat) {
    let chatInfo = {};
    chatInfo[chat.name] = true;

    this.db.object(`users/${this.userService.displayName}/groups`).update(chatInfo);
  }

  private async updateChatroomGroups(chat: Chat) {
    const chatMember = {};
    chatMember[this.userService.displayName] = true;

    this.db.object(`groups/${chat.name}/members`).update(chatMember);
  }

  public getActiveChatMessages(): Observable<any> {
    const chatRef = (this.activeChat != undefined) ?
      this.db.list(`messages/${this.activeChat.name}`) :
      this.db.list(`messages/`, ref => ref.orderByKey().limitToFirst(1));

    return chatRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
  }

  public logout() {
    this.userService.logout();
  }

  public isOwnMessage(messageAuthorId: string): boolean {
    return (messageAuthorId == this.userService.uid);
  }
}
