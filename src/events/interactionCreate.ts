import { ApplicationCommand, Interaction } from "discord.js";
import App from "../App";
import Event from "../types/Event";
export default new Event('interactionCreate', (app: App) => {
    return (interaction: Interaction) => {
        if (interaction.isCommand()){
            console.log(interaction)
        }
    }
})