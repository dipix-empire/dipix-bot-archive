import App from '../App'
import Discord from 'discord.js'
export default class DiscordCommand {
    public readonly name: string
    public readonly description: string
    public readonly handler: (app: App, msg: Discord.Message, args: string[]) => void 
    run (app: App, msg: Discord.Message,args: string[]) {
        console.log(`Executing command: ${this.name}, with args: ${args}`)
        this.handler(app, msg, args)
    }
    static parse(text: string, prefix: string) : [command: string, args: string[]] {
        if (!text.startsWith(prefix)) return ["", []]
        let args = text.split(' ')
        let command = args?.shift()?.toLowerCase()?.slice(prefix.length)
        return [command || '', args]
    }

    constructor (
        name: string,
        description: string,
        handler: (app: App, msg: Discord.Message,args: string[]) => void = () => { return }
    ) {
        this.name = name
        this.handler = handler
        this.description = description
    }
}