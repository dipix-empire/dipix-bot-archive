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
            let commandsList: SlashCommandBuilder[] = []
            commands.forEach(e => {
                let cmd = new SlashCommandBuilder().setName(e.name)
                if (e.description) cmd.setDescription(e.description)
                commandsList.push(cmd)
            })
            let commandsJSON = commandsList.map(cmd => cmd.toJSON())
            const rest = new REST({ version: '9'}).setToken(process.env.TOKEN || "")
            try {
                rest.put(Routes.applicationCommands(process.env.CLIENT || ""), { body: commandsJSON})
                    .then(() => console.log(`Upload ${commandsList.length} commands`))
            } catch (err) { console.error(err)}
        }
    },
    EventType.once
)