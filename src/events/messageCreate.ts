import Event, {EventType} from "../types/Event"
import Discord from 'discord.js'
import DiscordCommand from "../types/DiscordCommand"
import Commands from './Commands'
import App from "../App"
import Conversation from "../types/Conversation"
export default new Event(
    "messageCreate",
    (app: App) => {
    return (msg: Discord.Message) => {
        if (msg.author.id === app?.bot?.user?.id && msg.type === "CHANNEL_PINNED_MESSAGE") return msg.delete()
        if (msg.author.bot) return
        if(Conversation.list.has(msg.author.id) && msg.channel.type === 'DM')
            Conversation.list.get(msg.author.id)?.next(msg)
    }},
    EventType.on
)