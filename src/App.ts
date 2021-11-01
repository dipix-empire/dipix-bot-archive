import Discord from 'discord.js'
import Pterodactyl from './js/Pterodactyl'
import events from './events'
import Database from './types/Database'

export default class App {
    public readonly bot: Discord.Client
    public readonly db: Database
    public readonly buffer: Discord.Collection<string, Object>
    private readonly token: string
    public readonly panel: Pterodactyl
    public readonly startTime: Date

    async load() : Promise<App> {
        await this.db.connect().then(() => console.log('Connected to database'))
        events.forEach(e => {
            this.bot[e.type](e.name, e.handler(this))
            console.log(`Connected event ${e.name}`)
        })
        return this
    }

    start () : App {
        this.bot.login(this.token)
        return this
    }

    constructor (
        token: string | undefined,
        panelData: {host: string | undefined, key: string | undefined, id: string | undefined} | undefined,
        database: {id: string | undefined, keyPath: string | undefined} | undefined
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
        this.db = new Database(this, database?.id || "", database?.keyPath || "")
        this.panel = new Pterodactyl(panelData?.host || "", panelData?.key || "", panelData?.id || "")
        this.buffer = new Discord.Collection<string, Object>()
    }
}