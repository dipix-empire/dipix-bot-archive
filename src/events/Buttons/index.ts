import Discord from "discord.js";
import DiscordButton from "../../types/DiscordButton";
import form from './form'

const files = [form]

const buttons = new Discord.Collection<string,DiscordButton>()

files.forEach(e => {
    buttons.set(e.type, e)
})

export default buttons