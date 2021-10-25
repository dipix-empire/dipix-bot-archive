import { CommandInteraction } from "discord.js";
import App from "../../App";
import DiscordCommand from "../../types/DiscordCommand";

export default new DiscordCommand('uptime', 'Show bot uptime', 
    (app: App, interaction: CommandInteraction) => {
        interaction.reply({content: `Работаю!\nВремя работы: ${new Date(new Date().getTime() - app.startTime.getTime())}`})
    }
)