import Conversation from "../../types/Conversation";

export default async (conversation: Conversation, isFirst = false) => {
	if (isFirst) conversation.user.send(conversation.startMessage)
	await conversation.user.send(conversation.questions[conversation.step].question)
}