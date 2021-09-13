import { Message, MessageEmbed, TextChannel, Collection, MessageActionRow, MessageButton } from "discord.js"
import Conversation from "../types/Conversation"
export default {
    newPlayer: (msg: Message) => new Conversation(msg.author, 
        'Вы начали заявку на присоединение к серверу DiPix.\nОбязательные вопросы помечены *. **Ответы будут опубликованы**',[
        'Вы принимаете правила сервера? * ',
        'Ваш ник в Майнкрафт? * ',
        'Ваш возраст? * ',
        'Ваш клиент (Java, Bedrock, Оба)? * ',
        'Биография вашего персонажа?',
        'Что вы планируете делать на сервере?',
        'Кто вас пригласил / ваш промокод?',
        'Ваш пол?'
    ], (answers: Collection<string, string>) => {
        msg.channel.send(`Поступила заявка от <@!${msg.author.id}>`).then(startMsg => {
            let chnl: TextChannel
            if (msg.channel instanceof (TextChannel)) chnl = msg.channel as TextChannel
            else return
            chnl.threads.create({
                startMessage: startMsg,
                name: `Заявка на присоединение от игрока ${msg.author.tag}`,
                autoArchiveDuration: 1440
            }).then(thread => {
                const embed = new MessageEmbed()
                    .setTitle('Детали заявки')
                answers.each((val, key) => {
                    embed.addField(key, val, true)
                })
                const msgText = `` //+ `На заявку отвечает <$&${process.env.ADMIN_ROLE_ID}>`
                const buttons = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                            .setLabel('Принять')
                            .setStyle('PRIMARY')
                            .setCustomId(`form:join:${thread.id}:${msg.author.id}:accept`)
                            .setDisabled(true),
                        new MessageButton()
                            .setLabel('Отклонить')
                            .setStyle('DANGER')
                            .setCustomId(`form:join:${thread.id}:${msg.author.id}:deny`)
                            .setDisabled(true),
                        new MessageButton()
                            .setLabel('Проверить на уникальность')
                            .setStyle('SECONDARY')
                            .setCustomId(`form:join:${thread.id}:${msg.author.id}:check`)
                            .setDisabled(true),
                        new MessageButton()
                            .setLabel('Написать эту заявку')
                            .setStyle('SECONDARY')
                            .setCustomId(`form:common:write`)
                            .setDisabled(true),
                    )
                thread.send({content: msgText, components: [buttons],embeds: [embed]}).then(msg => msg.pin())
            })
        })
    }, (step: number, text: string) => {
        switch(step) {
            case 0:
                return !(['да', 'yes', 'y', 'д'].indexOf(text.toLowerCase()) === -1)
            case 2:
                let pattern2 = /^[1-9]\d*|0$/
                return (pattern2.test(text))
            case 3:
                return !(['java','bedrock','джава','бедрок','оба'].indexOf(text.toLowerCase()) === -1)
            default:
                return true 
        }
    })
}