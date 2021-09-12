import App from "../../App";
import DiscordCommand from "../../Types/DiscordCommand";
import Discord from "discord.js";
import Conversation from "../../Types/Conversation";
export default new DiscordCommand('form', (app: App, msg: Discord.Message, args: string[]) => {
    switch (args[0]) {
        case 'join':
            Conversation.presets.newPlayer(msg).run()
            break;
        case 'list':
            msg.channel.send('Список заявок:\n\tjoin - заявка на присоединение к серверу')
            break;
        default:
            msg.channel.send(`Неизвестный тип заявки, для выведения списка дсотупных введите ${process.env.Prefix}form list`)
    }
})