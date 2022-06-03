import { CommandInteraction } from "discord.js";
import App from "../../App";
import Conversation from "../../types/Conversation";
import { Collection } from "discord.js";
import Conversations from "../../content/Conversations";

export default async (interaction: CommandInteraction, buffer: Collection<string, Conversation>) => {
	await interaction.deferReply()
	let type = interaction.options.getString('type') as "join"
	buffer.set(interaction.user.id, Conversations[type](interaction.user))
}