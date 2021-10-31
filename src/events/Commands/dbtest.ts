import { CommandInteraction } from "discord.js";
import App from "../../App";
import DiscordCommand from "../../types/DiscordCommand";

export default new DiscordCommand('dbtest', 'test database', 
    async (app: App, interaction: CommandInteraction) => {
        await app.db.modules.get('user')?.update(JSON.stringify({'1':{user:123}, '2':{user:123123}}))
        let data = await app.db.modules.get('user')?.get()
        console.log('data:', data)
        interaction.reply({content: `data: ${data || ''}`})
    }
)