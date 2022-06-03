import Discord, { TextChannel } from 'discord.js'
import events from './events'
import ServerTap from './types/ServerTap'
import { PrismaClient } from '@prisma/client'
import { EventEmitter } from 'stream'
export default class App {
    public readonly bot: Discord.Client
    public readonly db: PrismaClient
    public readonly buffer: Discord.Collection<string, Object>
    public readonly startTime: Date
    public readonly servertap: ServerTap
    public readonly events: EventEmitter

    private readonly token: string
    
    async load() : Promise<App> {
        await this.db.$connect()
        events.forEach(e => {
            this.bot[e.type](e.name, e.handler(this))
            console.log(`Connected event ${e.name}`)
        })
        return this
    }

    start () : App {
        this.bot.login(this.token)
        this.servertap.on('message', (msg: any) => (
            this.bot.channels.cache.get(process.env.CONSOLE_CHANNEL_ID || '') as TextChannel)?.send('`'+JSON.parse(msg).message+'`'
        ))
        this.servertap.on('close', (time) => {
            (this.bot.channels.cache.get(process.env.CONSOLE_CHANNEL_ID || '') as TextChannel)?.send(`Connection to server closed. Trying to connect in ${time/1000} seconds`)
        })
        return this
    }

    constructor (
        token: string | undefined,
        database: {id: string | undefined, keyPath: string | undefined} | undefined,
        serverApi: {key: string, url:string}
    ) {
        this.startTime = new Date()
        this.bot = new Discord.Client({intents: [
            'GUILDS',
            'GUILD_MESSAGES',
            'DIRECT_MESSAGES',
            'DIRECT_MESSAGE_TYPING',
            'GUILD_MEMBERS'
        ]})
        this.token = token?.toString() || ""
        this.db = new PrismaClient()
        // this.db = new Database(this, database?.id || "", database?.keyPath || "")
        this.buffer = new Discord.Collection<string, Object>()
        this.servertap = new ServerTap(serverApi.url, serverApi.key)
        this.events = new EventEmitter()
    }
}