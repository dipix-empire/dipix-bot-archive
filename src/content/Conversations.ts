import { Message, MessageEmbed, TextChannel, Collection, MessageActionRow, MessageButton, CommandInteraction } from "discord.js"
import Conversation from "../types/Conversation"
export default {
    newPlayer: (interaction: CommandInteraction) => new Conversation(interaction.user, 
        'Вы начали заявку на присоединение к серверу DiPix.\nОбязательные вопросы помечены *, на необязательные вопросы можно ответить -\n**Ответы будут опубликованы**',[
        'Вы принимаете правила сервера? * ',
        'Ваш ник в Майнкрафт? * ',
        'Ваш возраст? * ',
        'Ваш клиент (Java, Bedrock, Оба)? * ',
        'Биография вашего персонажа?',
        'Что вы планируете делать на сервере?',
        'Кто вас пригласил / ваш промокод?',
        'Ваш пол?'
    ], async (answers: Collection<string, string>) => {
        await interaction.editReply(`Поступила заявка от <@!${interaction.user.id}>`)
        let msg = await interaction.fetchReply() as Message
        let channel = msg.channel as TextChannel
        let thread = await channel.threads.create({
            startMessage: msg,
            name: `Заявка на присоединение от игрока ${interaction.user.tag}`,
            autoArchiveDuration: 1440
        })
        let msgText = `На заявку отвечает` //+ `<$&${process.env.ADMIN_ROLE_ID}>`
        let embed = new MessageEmbed().setTitle('Детали заявки')
        answers.each((val, key) => {
            embed.addField(key, val, true)
        })
        const buttons = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId(`form:join:accept:${thread.id}:${interaction.user.id}`)
                    .setStyle('PRIMARY')
                    .setLabel('Принять'),
                new MessageButton()
                    .setCustomId(`form:join:deny:${thread.id}:${interaction.user.id}`)
                    .setStyle('DANGER')
                    .setLabel('Отклонить')
                    .setDisabled(true),
                new MessageButton()
                    .setCustomId(`form:join:check:${thread.id}:${interaction.user.id}`)
                    .setStyle('SECONDARY')
                    .setLabel('Проверить')
                    .setDisabled(true),
                new MessageButton()
                    .setCustomId(`form:common:write:join`)
                    .setStyle('SECONDARY')
                    .setLabel('Написать'),
            )
        thread.send({content: msgText, components: [buttons], embeds: [embed]}).then(msg => msg.pin())
        
        //         const buttons = new MessageActionRow()
        //             .addComponents(
        //                 new MessageButton()
        //                     .setLabel('Принять')
        //                     .setStyle('PRIMARY')
        //                     .setCustomId(`form:join:${thread.id}:${msg.author.id}:accept`)
        //                     .setDisabled(true),
        //                 new MessageButton()
        //                     .setLabel('Отклонить')
        //                     .setStyle('DANGER')
        //                     .setCustomId(`form:join:${thread.id}:${msg.author.id}:deny`)
        //                     .setDisabled(true),
        //                 new MessageButton()
        //                     .setLabel('Проверить на уникальность')
        //                     .setStyle('SECONDARY')
        //                     .setCustomId(`form:join:${thread.id}:${msg.author.id}:check`)
        //                     .setDisabled(true),
        //                 new MessageButton()
        //                     .setLabel('Написать эту заявку')
        //                     .setStyle('SECONDARY')
        //                     .setCustomId(`form:common:write`)
        //                     .setDisabled(true),
        //             )
        //     })
        // }
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