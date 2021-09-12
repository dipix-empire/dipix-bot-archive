import App from "../../App";
import DiscordCommand from "../../Types/DiscordCommand";
import Discord from "discord.js";
import Conversation from "../../Types/Conversation";
export default new DiscordCommand('form', (app: App, msg: Discord.Message, args: string[]) => {
    Conversation.presets.newPlayer(msg).run()
})