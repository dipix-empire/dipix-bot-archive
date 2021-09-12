import Discord from "discord.js";
import DiscordCommand from "../../Types/DiscordCommand";
import q from './form'

const files = [q]

const commands = new Discord.Collection<string,DiscordCommand>()

files.forEach(e => {
    commands.set(e.name, e)
})

export default commands