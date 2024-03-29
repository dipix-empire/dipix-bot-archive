import Discord from "discord.js";
import DiscordCommand from "../../types/DiscordCommand";
import form from './form'
import nick from "./nick";
import uptime from "./uptime";

const files = [form, nick, uptime]

const commands = new Discord.Collection<string,DiscordCommand>()

files.forEach(e => {
    commands.set(e.name, e)
})

export default commands
