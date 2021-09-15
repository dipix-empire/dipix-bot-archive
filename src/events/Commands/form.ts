import App from "../../App";
import DiscordCommand from "../../types/DiscordCommand";
import Discord from "discord.js";
import Conversation from "../../types/Conversation";
export default new DiscordCommand('form', 'Написать заявку',(app: App, msg: Discord.Message, args: string[]) => {
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