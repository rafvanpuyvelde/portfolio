import { Component, Input, OnInit } from '@angular/core';
import { Chat } from './Chat';
import { ChatroomService } from "../../services/chatroom.service";

@Component({
  selector: 'chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  @Input() chat: Chat;
  constructor(private chatroom: ChatroomService) {}

  ngOnInit() { }

  async deleteChat() {
    await this.chatroom.deleteChatGroup(this.chatroom.activeChatKey)
      .catch(error => console.log(error));
  }
}
