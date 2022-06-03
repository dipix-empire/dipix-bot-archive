import { Message, MessageEmbed, TextChannel, Collection, MessageActionRow, MessageButton, CommandInteraction, Interaction, ButtonInteraction, ThreadChannel, User } from "discord.js"
import App from "../App"
import Conversation from "../types/Conversation"
export default {
    "join": (user: User) => new Conversation(user, 
        'Вы начали заявку на присоединение к серверу DiPix.\nОбязательные вопросы помечены *, на необязательные вопросы можно ответить -\n**Ответы будут опубликованы**',[
            {question: 'Вы принимаете правила сервера? * ', answerRegExp: /^(y|д)/},
            {question: 'Ваш ник в Майнкрафт? * ', answerRegExp: /^\w+$/},
            {question: 'Ваш возраст? * ', answerRegExp: /^[1-9]\d+$/},
            {question: 'Ваш клиент (Java, Bedrock, Оба)? * ', answerRegExp: /^(java|bedrock|оба)$/},
            {question: 'Биография вашего персонажа?', answerRegExp: /^/},
            {question: 'Что вы планируете делать на сервере?', answerRegExp: /^/},
            {question: 'Кто вас пригласил / ваш промокод?', answerRegExp: /^/},
            {question: 'Ваш пол?', answerRegExp: /^(m|b|м|п|w|g|ж|д|-)/}
        ]
    ),
    // ], async (answers: Collection<string, string>) => {
    //     await interaction.editReply(`Поступила заявка от <@!${interaction.user.id}>`)
    //     let msg = await interaction.fetchReply() as Message
    //     let channel = msg.channel as TextChannel
    //     let thread = await channel.threads.create({
    //         startMessage: msg,
    //         name: `Заявка на присоединение от игрока ${interaction.user.tag}`,
    //         autoArchiveDuration: 1440
    //     })
    //     let msgText = `На заявку отвечает ` + `<@&${process.env.ADMIN_ROLE_ID}>`
    //     let embed = new MessageEmbed().setTitle('Детали заявки')
    //     let bufferData: string[] = []
    //     answers.each((val, key) => {
    //         embed.addField(key, val, true)
    //         bufferData.push(val)
    //     })
    //     app.buffer.set(`form:join:${interaction.user.id}`, bufferData)
    //     const buttons = new MessageActionRow()
    //     .addComponents(
    //         new MessageButton()
    //         .setCustomId(`form:join:accept:${thread.id}:${interaction.user.id}`)
    //         .setStyle('PRIMARY')
    //         .setLabel('Принять'),
    //         new MessageButton()
    //         .setCustomId(`form:join:deny:${thread.id}:${interaction.user.id}`)
    //         .setStyle('DANGER')
    //         .setLabel('Отклонить'),
    //         new MessageButton()
    //         .setCustomId(`form:join:check:${thread.id}:${interaction.user.id}`)
    //         .setStyle('SECONDARY')
    //         .setLabel('Проверить'),
    //         new MessageButton()
    //         .setCustomId(`form:common:write:join`)
    //         .setStyle('SECONDARY')
    //         .setLabel('Написать'),
    //     )
    //     thread.send({content: msgText, components: [buttons], embeds: [embed]}).then(msg => msg.pin())
    // }, (step: number, text: string) => {
    //     switch(step) {
    //         case 0:
    //             return !(['да', 'yes', 'y', 'д'].indexOf(text.toLowerCase()) === -1)
    //         case 2:
    //             let pattern2 = /^[1-9]\d*|0$/
    //             return (pattern2.test(text))
    //         case 3:
    //             return !(['java','bedrock','джава','бедрок','оба'].indexOf(text.toLowerCase()) === -1)
    //         default:
    //             return true 
    //     }
    // }),
    denyReason: (app:App, interaction: ButtonInteraction, data: string[]) => new Conversation(
        interaction.user,
        '',
        [
            {question: 'Вы отклонили заявку. Назовите причину отказа', answerRegExp: /^/}
        ],
        /*
        async (answers: Collection<string, string>) => {
            let msg_d = interaction.message as Message
            const buttons_d = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                    .setCustomId(`form:join:accept:${data[3]}:${data[4]}`)
                        .setStyle('PRIMARY')
                        .setLabel('Принять')
                        .setDisabled(true),
                    new MessageButton()
                        .setCustomId(`form:join:deny:${data[3]}:${data[4]}`)
                        .setStyle('DANGER')
                        .setLabel('Отклонить')
                        .setDisabled(true),
                    new MessageButton()
                        .setCustomId(`form:join:check:${data[3]}:${data[4]}`)
                        .setStyle('SECONDARY')
                        .setLabel('Проверить')
                        .setDisabled(true),
                    new MessageButton()
                        .setCustomId(`form:common:write:join`)
                        .setStyle('SECONDARY')
                        .setLabel('Написать'),
                )
            await msg_d.edit({components:[buttons_d]})
            await interaction.editReply({content:`Заявка от <@${data[4]}> отклонена <@${interaction.user.id}> по причине: ${answers.first()}`})
            let repl_d = await interaction.fetchReply() as Message
            await repl_d.pin()
            let thread_d = await interaction.channel
            if (thread_d?.isThread()) { 
                let tread = thread_d as ThreadChannel
                tread?.setAutoArchiveDuration(60)
            }
            app.buffer.delete(`form:join:${data[4]}`)
            app.buffer.delete(`button:form:${data[3]}`)
        }
        */
    )
}
