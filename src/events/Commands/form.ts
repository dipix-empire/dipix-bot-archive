import App from "../../App";
import DiscordCommand from "../../types/DiscordCommand";
import Discord, { CommandInteraction } from "discord.js";
import Conversation from "../../types/Conversation";
import { SlashCommandBuilder, SlashCommandStringOption } from "@discordjs/builders";

export default new DiscordCommand('form', 'Написать заявку', (app: App, interaction: CommandInteraction) => {
    let type = interaction.options.getString('type')
    switch (type){
        case 'join':
            Conversation.presets.newPlayer(interaction).run()
            return interaction.reply(`Ожидание конца опроса...`)
        default:
            return interaction.reply({content:'Неизвестный тип заявки', ephemeral: true})
    }
}, (builder: SlashCommandBuilder) => 
    builder.
        addStringOption((option: SlashCommandStringOption) => 
            option
                .setRequired(true)
                .setName('type')
                .setDescription('Тип заявки')
                .addChoice('join server','join')
        )
)
/*
export default new DiscordCommand('form', 'Написать заявку',(app: App, msg: Discord.Message, args: string[]) => {
    switch (args[0]) {
        case 'join':
            Conversation.presets.newPlayer(msg).run()
            break;
        case 'list':
            msg.channel.send('Список заявок:\n\tjoin - заявка на присоединение к серверу')
            break;
        default:
            msg.channel.send(`Неизвестный тип заявки, для выведения списка дсотупных введите ${process.env.Prefix}form list`)
    }
})*/