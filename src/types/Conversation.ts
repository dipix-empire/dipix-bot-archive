import { Message, User, Collection } from "discord.js"
import Conversations from "../content/Conversations"

export default class Conversation{
    public static list = new Collection<string, Conversation>()
    public static presets = Conversations
    public readonly user: User
    public readonly startMessage: string
    public readonly questions: {question: string, answerRegExp: RegExp}[]
    public answers: Array<string>
    public step: number = 0
    public incorrects: number = 0
    // run(){
    //     if (this.startMessage) this.user.send(this.startMessage)
    //     this.user.send(this.questions[this.step].question)
    // }
    // next(msg: Message){
    //     if (msg.content){
    //         this.answers[this.step] = msg.content
    //         if (this.step < this.questions.length - 1){
    //             this.step++
    //             this.user.send(this.questions[this.step])
    //         }
    //         else {
    //             Conversation.list.delete(msg.author.id)
    //             this.handler(this.getAnswers())
    //         }
    //     }
    //     else msg.channel.send('Ответ не подходит, попробуйте снова')
        
    // }
    // private readonly handler: (answers: Collection<string, string>) => void
    // private getAnswers(): Collection<string, string>{
    //     let result = new Collection<string, string>()
    //     for (let i = 0; i < this.questions.length; i++)
    //         result.set(this.questions[i], this.answers[i])
    //     return result
    // }
    constructor(
        user: User, 
        startMessage: string, 
        questions: {question: string, answerRegExp: RegExp}[] 
    ){
        Conversation.list.set(user.id, this)
        this.user = user
        this.startMessage = startMessage
        this.questions = questions
        this.answers = new Array<string>()
    }
}