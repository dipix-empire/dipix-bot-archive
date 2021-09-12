import { Message, MessageEmbed, TextChannel, Collection } from "discord.js"
import Conversation from "../Types/Conversation"
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
                let embed = new MessageEmbed()
                    .setTitle('Детали заявки')
                answers.each((val, key) => {
                    embed.addField(key, val, true)
                })
                thread.send({embeds: [embed]}).then(msg => msg.pin())
                thread.send(
                    //TODO: UNCOMMENT IN PRODUCTION!!!
                    //`На заявку отвечает: <@&${process.env.ADMIN_ROLE_ID}>\n`+
                    `:white_check_mark: - Принять заявку
                    :x: - Отклонить заявку 
                    :grey_question: - Проверить на подлинность
                    :mailbox: - написать такую же заявку
                `).then(msg => {
                    msg.pin()
                    msg.react('✅').then(()=>msg.react('❌')).then(()=>msg.react('❔')).then(()=>msg.react('📫'))
                    const filter = (reaction: any, user: any) => {
                        return ['✅', '❌', '❔','📫'].includes(reaction.emoji.name) && !user.bot;
                    };
                    msg.awaitReactions({ filter, max: 4, time: 60000, errors: ['time'] })
                        .then(collected => {
                            collected.forEach(reaction => {
                                switch (reaction?.emoji?.name) {
                                    case '✅':
                                        console.log('reaction 1')
                                        break
                                    case '❌': 
                                        console.log('reaction 2')
                                        break
                                    case '❔':
                                        console.log('reaction 3')
                                        break
                                    case '📫':
                                        console.log('reaction 4')
                                        break
                                }
                            })
                            
                        });
                })
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