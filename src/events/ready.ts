import App from "../App";
import Event, { EventType } from "../types/Event";
import { SlashCommandBuilder } from "@discordjs/builders";
import { REST } from '@discordjs/rest'
import { Routes } from "discord-api-types/v9";
import commands from "./Commands";

export default new Event('ready',
    (app: App) => {
        return () => {
            console.log(`Start with tag: ${app.bot.user?.tag}`)
            let commandsList: Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">[] = []
            commands.forEach(e => commandsList.push(e.slashInfo))
            let commandsJSON = commandsList.map(cmd => cmd.toJSON())
            const rest = new REST({ version: '9'}).setToken(process.env.TOKEN || "")
            app.bot.guilds.cache.forEach(guild => 
            {
                try {
                    rest.put(Routes.applicationGuildCommands(process.env.CLIENT || "", guild.id), { body: commandsJSON})
                        .then(() => console.log(`Upload ${commandsList.length} commands for guild ${guild.name}`))
                } catch (err) { 
                    console.error(err)
                }
            })
        }
    },
    EventType.once
)