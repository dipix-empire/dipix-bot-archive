import { Interaction } from "discord.js";
import App from "../App";
import Event from "../types/Event";
export default new Event('interactionCreate', (app: App) => {
    return (interaction: Interaction) => {
        if (interaction.isButton()) {
            const params = interaction.customId.split(':')
        }
    }
})