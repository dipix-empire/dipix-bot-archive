import { ApplicationCommand, Interaction, MessagePayload } from "discord.js";
import App from "../App";
import Event from "../types/Event";
import commands from "./Commands";
export default new Event('interactionCreate', (app: App) => {
    return async (interaction: Interaction) => {
        if (interaction.isCommand()){
            try {commands.get(interaction.commandName)?.run(app, interaction)}
            catch (err) {console.log(err)}
        }
    }
})