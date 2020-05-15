import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {ChatroomService} from "../../services/chatroom.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'chat-detail',
  templateUrl: './chatdetail.component.html',
  styleUrls: ['./chatdetail.component.scss']
})
export class ChatdetailComponent implements OnInit, OnDestroy {
  private messageForm: FormGroup;
  private messages$: Observable<any>;
  private navigationSubscription;

  constructor(private chatroom: ChatroomService, private fb: FormBuilder, private router: Router) {
    this.messageForm = this.fb.group({
      message: ['']
    });

    this.navigationSubscription = this.router.events.subscribe((e:any) => {if (e instanceof NavigationEnd) this.initMessages();})
  }

  initMessages(): void {
    this.messages$ = this.chatroom.getActiveChatMessages();
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  private isOwnMessage(messageAuthorId: string): boolean {
    return this.chatroom.isOwnMessage(messageAuthorId);
  }

  sendMessage() {
    this.chatroom.addMessageToActiveChatGroup(this.chatroom.activeChatKey, this.messageForm.get('message').value)
      .then(() => console.log('Message added'));
  }
}
