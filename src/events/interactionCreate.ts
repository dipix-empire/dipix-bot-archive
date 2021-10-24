import { ApplicationCommand, Interaction, MessagePayload } from "discord.js";
import App from "../App";
import Event from "../types/Event";
import commands from "./Commands";
import buttons from './Buttons'
export default new Event('interactionCreate', (app: App) => {
    return async (interaction: Interaction) => {
        if (interaction.isCommand()){
            try {commands.get(interaction.commandName)?.run(app, interaction)}
            catch (err) {console.log(err)}
        }
        if (interaction.isButton()){
            let parts = interaction.customId.split(':')
            try {buttons.get(parts[0])?.run(app, interaction, parts)}
            catch (err) {console.log(err)}
        }
    }
})