import Discord from 'discord.js'
import Mongoose from 'mongoose'
import Pterodactyl from './JS/Pterodactyl'
import events from './events'

export default class App {
    public readonly bot: Discord.Client
    private readonly db: string
    private readonly token: string
    public readonly panel: Pterodactyl
    public readonly startTime: Date

    load() : App {
        events.forEach(e => {
            this.bot[e.type](e.name, e.handler(this))
            console.log(`Connected event ${e.name}`)
        })
        return this
    }

    start () : App {
        if (this.db) Mongoose.connect(this.db)
        this.bot.login(this.token)
        return this
    }

    constructor (
        token: string | undefined, db: string | undefined,
        panelData: {host: string | undefined, key: string | undefined, id: string | undefined} | undefined
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
        this.db = db?.toString() || ""
        this.panel = new Pterodactyl(panelData?.host || "", panelData?.key || "", panelData?.id || "")
    }
}