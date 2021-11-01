import App from '../App'
import Discord, { CommandInteraction } from 'discord.js'
import { SlashCommandBuilder } from '@discordjs/builders'
export default class DiscordCommand {
    public readonly name: string
    public readonly description: string
    public readonly handler: (app: App, interaction: CommandInteraction) => void
    public readonly slashInfo: Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">
    run (app: App, interaction: CommandInteraction) {
        console.log(`Executing command '${this.name}' by '${interaction.user.tag}'`)
        this.handler(app, interaction)
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
        handler: (app: App, interaction: CommandInteraction) => void = () => { return },
        slashInfo: (builder: SlashCommandBuilder) => Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup"> = 
            (builder: SlashCommandBuilder) => builder
    ) {
        this.name = name
        this.handler = handler
        this.description = description
        this.slashInfo = slashInfo(new SlashCommandBuilder().setName(name).setDescription(description))
    }
}
