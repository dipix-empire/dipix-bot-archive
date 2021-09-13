import Discord from "discord.js";
import DiscordCommand from "../../types/DiscordCommand";
import form from './form'

const files = [form]

const commands = new Discord.Collection<string,DiscordCommand>()

files.forEach(e => {
    commands.set(e.name, e)
})

export default commands