import * as functions from "firebase-functions";

export const onMessageCreate = functions.database
.ref('/messages/{chatId}/{messageId}/')
.onCreate((snapshot, context) => {
  const chatId = context.params.chatId;
  const messageId = context.params.messageId;

  const messageData = snapshot.val();
  const text = addEmoji(messageData.text);

  console.log(messageData.text);
  console.log(text);

  return snapshot.ref.update({text: text})
    .catch(() => console.log(`Error while adding Emoji, chatId: ${chatId} | messageId: ${messageId}`))
    .then(() => console.log(`Emoji added, chatId: ${chatId} | messageId: ${messageId}`));
});

function addEmoji(text: string): string {
  return text.replace(':D', '😃')
}
