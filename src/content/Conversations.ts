import { Message } from "discord.js"
import Conversation from "../Types/Conversation"
export default {
    newPlayer: (msg: Message) => new Conversation(msg.author, [
        'Вы принимаете правила сервера? * ',
        'Ваш ник в Майнкрафт? * ',
        'Ваш возраст? * ',
        'Ваш клиент (Java, Bedrock, Оба)? * ',
        'Биография вашего персонажа?',
        'Что вы планируете делать на сервере?',
        'Кто вас пригласил / ваш промокод?',
        'Ваш пол?'
    ], (answers: object) => {
        let ans = `Поступила новая заявка\n\tUsertag : ${msg.author.tag}\n`
        msg.channel.send(ans)
    })
}