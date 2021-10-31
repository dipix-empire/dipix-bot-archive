import { CommandInteraction } from "discord.js";
import App from "../../App";
import DiscordCommand from "../../types/DiscordCommand";

export default new DiscordCommand('uptime', 'Show bot uptime', 
    (app: App, interaction: CommandInteraction) => {
        let secs = (new Date().getTime() - app.startTime.getTime())/1000>>0
        let mins = (secs/60) >> 0
        secs = secs % 60
        let hours = (mins/60) >> 0
        mins = mins % 60
        let days = (hours/24) >> 0
        hours = hours % 24
        interaction.reply({content: `Working!\nWork time: ${days} day(s), ${hours} hour(s), ${mins} min(s), ${secs} sec(s)`})
    }
)