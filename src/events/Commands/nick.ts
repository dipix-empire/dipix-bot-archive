import { SlashCommandBuilder, SlashCommandStringOption } from "@discordjs/builders";
import { SlashCommandOptionBase } from "@discordjs/builders/dist/interactions/slashCommands/mixins/CommandOptionBase";
import { CommandInteraction, GuildMember, Message } from "discord.js";
import App from "../../App";
import DiscordCommand from "../../types/DiscordCommand";

export default new DiscordCommand('nick', "Сменить никнейм", async (app: App, interaction: CommandInteraction) => {
    let nick = interaction.options.getString('nickname')
    let member = interaction.member as GuildMember
    try {
        if (nick == null){
            await member.setNickname(member.user.username)
            interaction.reply({content: `Ваш никнейм сброшен`, ephemeral: true})
        }
        else {
            await member.setNickname(nick)
            interaction.reply({content: `Ваш никнейм изменен на ${nick}`, ephemeral: true})
        }
    } catch (e) {interaction.reply({content: `**Произошла ошибка**`, ephemeral: true})}
}, (builder: SlashCommandBuilder) => 
    builder
        .addStringOption((option: SlashCommandStringOption) => 
            option.setName('nickname')
                .setDescription('Ваш новый никнейм')
                .setRequired(false)
        )
        
)