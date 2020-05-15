import { IChat } from './IChat';

export class Chat implements IChat {
  name: string;
  messages: [];
  creatorUid: string;
  lastMessage: string;
  timestamp: Date;
  nameOfLastSender: string;

  constructor(name: string, creator: string) {
    this.name = name;
    this.messages = null;
    this.timestamp = new Date();
    this.lastMessage = null;
    this.creatorUid = creator;
    this.nameOfLastSender = null;
  }
}
