import { Collection, CommandInteraction, GuildMember, Message } from "discord.js"
import App from "../App"
import createConversation from "../tasks/conversation/createConversation"
import sendQuestion from "../tasks/conversation/sendQuestion"
import Controller from "../types/Controller"
import Conversation from "../types/Conversation"

let conversationBuffer = new Collection<string ,Conversation>()

let newConversation = new Controller<{status: number}>(
	"conversation.start",
	async (app: App, interaction: CommandInteraction) => {
		await createConversation(interaction, conversationBuffer)
		await sendQuestion(conversationBuffer.get(interaction.user.id) as Conversation, true)
		return {status: 0}
	},
	(err) => {
		return {status: -1}
	}
)
let newAnswer = new Controller<{status: number}>(
	"conversation.next",
	async (app: App, msg: Message) => {
		let conversation = conversationBuffer.get(msg.author.id) as Conversation
		if (!conversation.questions[conversation.step].answerRegExp.test(msg.content.toLowerCase())) {
			await msg.reply("Некорректный ответ!")
			conversation.incorrects++
			return {status: 1}
		}
		conversation.incorrects = 0
		conversation.answers.push(msg.content)
		conversation.step++
		// if (conversationBuffer.get(msg.author.id)?.questions.length == conversationBuffer.get(msg.author.id)?.step)
		return {status: 0}
	},
	(err) => {
		return {status: -1}
	}
)
