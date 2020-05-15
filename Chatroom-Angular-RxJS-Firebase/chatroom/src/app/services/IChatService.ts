import { Observable } from "rxjs";
import { Chat } from "../components/chat/Chat";

export interface IChatService {
  chat: Observable<Chat>;
  addMessageToChat(message: string, username: string);
}
