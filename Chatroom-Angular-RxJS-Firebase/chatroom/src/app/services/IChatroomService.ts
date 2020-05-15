import { User } from "firebase";
import { Observable } from "rxjs";
import { Chat } from "../components/chat/Chat";

export interface IChatroomService  {
  chats: Observable<any>;
  deleteChatGroup(key: string): void;
  createChatGroup(chatGroupName: string): void;
  addMessageToActiveChatGroup(chatKey: string, message: string): void;
}
