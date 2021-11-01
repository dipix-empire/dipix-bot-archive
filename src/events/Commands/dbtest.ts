import { CommandInteraction } from "discord.js";
import App from "../../App";
import DiscordCommand from "../../types/DiscordCommand";

export default new DiscordCommand('dbtest', 'test database', 
    async (app: App, interaction: CommandInteraction) => {
        let data = await app.db.modules.get('forms')?.get()
        console.log('data:', data)
        interaction.reply({content: `data: ${data || ''}`})
    }
)