import { Message, User, Collection } from "discord.js"
import Conversations from "../content/Conversations"

export default class Conversation{
    public static list = new Collection<string, Conversation>()
    public static presets = Conversations
    public readonly user: User
    private readonly questions: Array<string>
    private answers: Array<string>
    private step: number = 0
    run(){
        this.user.send(this.questions[this.step])
    }
    next(msg: Message){
        if (this.checkAnswer(this.step, msg.content)){
            this.answers[this.step] = msg.content
            if (this.step < this.questions.length - 1){
                this.step++
                this.user.send(this.questions[this.step])
            }
            else {
                Conversation.list.delete(msg.author.id)
                this.handler(this.getAnswers())
            }
        }
        else msg.channel.send('Ответ не подходит, попробуйте снова')
        
    }
    private checkAnswer: (step: number, text: string) => boolean
    private readonly handler: (answers: object) => void
    private getAnswers(): Collection<string, string>{
        let result = new Collection<string, string>()
        for (let i = 0; i < this.questions.length; i++)
            result.set(this.questions[i], this.answers[i])
        return result
    }
    constructor(
        user: User, 
        questions: Array<string>, 
        handler: (answers: object) => void, 
        checkAnswer: (step: number, text: string) => boolean = (step: number, text: string) => {return true}
    ){
        Conversation.list.set(user.id, this)
        this.user = user
        this.questions = questions
        this.answers = new Array<string>()
        this.handler = handler
        this.checkAnswer = checkAnswer
    }
}