import { Observable } from 'rxjs';
import { Chat } from '../chat/Chat';
import { Component, OnInit } from '@angular/core';
import { ChatroomService } from '../../services/chatroom.service';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.scss']
})
export class ChatroomComponent implements OnInit {
  chatCreationModalShown: boolean;
  private createChatForm: FormGroup;

  constructor(private chatroom: ChatroomService, private fb: FormBuilder) { this.chatCreationModalShown = false; }

  ngOnInit() {
    this.createChatForm = this.fb.group({
      chatName: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  get chats(): Observable<any> {
    return this.chatroom.chats;
  }

  get chatName()  {
    return this.createChatForm.get('chatName');
  }

  async addChat() {
    await this.chatroom.createChatGroup(this.chatName.value)
      .then(() => {
        console.log('Chat created');
        this.resetCreateChatForm();
        this.chatCreationModalShown = false;
      });
  }

  onSelect(chat: Chat, key: string): void {
    this.chatroom.activeChat = chat;
    this.chatroom.activeChatKey = key;
  }

  resetCreateChatForm() {
    this.createChatForm.reset();
  }

  logout() {
    this.chatroom.logout();
  }
}
