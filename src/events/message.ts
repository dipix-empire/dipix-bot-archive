import Event, {EventType} from "../Types/Event"
import Discord from 'discord.js'
import DiscordCommand from "../Types/DiscordCommand"
import Commands from './Commands'
import App from "../App"
import Conversation from "../Types/Conversation"
export default new Event(
    "messageCreate",
    (app: App) => {
    return (msg: Discord.Message) => {
        if (msg.author.bot) return
        let [command, args] = DiscordCommand.parse(msg.content, process.env.Prefix || '')
        if (command) {
            Commands.get(command)?.run(app, msg, args)
        }
        else if(Conversation.list.has(msg.author.id))
            Conversation.list.get(msg.author.id)?.next(msg)
    }},
    EventType.on
)