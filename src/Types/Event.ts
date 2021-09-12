import Discord from 'discord.js'
import App from '../App'
export default class Event {
    public readonly type : EventType
    public readonly name : keyof Discord.ClientEvents
    public readonly handler : (app: App) => (...params: any[]) => void

    constructor (
        name: keyof Discord.ClientEvents, 
        handler: (app: App) => (...params: any[]) => void = () => () => {return},
        type: EventType = EventType.on
    ){
        this.type = type
        this.name = name
        this.handler = handler
    }
}
export enum EventType {
    once = 'once',
    on = 'on'
}