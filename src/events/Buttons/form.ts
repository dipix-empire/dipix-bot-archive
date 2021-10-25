import { ButtonInteraction, GuildMemberRoleManager, Message, MessageActionRow, MessageButton, Role, RoleResolvable } from "discord.js";
import App from "../../App";
import Conversations from "../../content/Conversations";
import DiscordButton from "../../types/DiscordButton";

export default new DiscordButton('form', async (app: App, interaction: ButtonInteraction, data: string[]) => {
    switch(data[1]) {
        case 'common':
            switch(data[2]) {
                case 'write':
                    interaction.reply({content: `Use /form type:${data[3]} in channel <#${process.env.FORMS_CHANNEL_ID}>`, ephemeral: true})
                    break
                default:
            }
            break
        case 'join':
                switch(data[2]) {
                    case 'accept':
                        let RoleManager_a = await interaction?.member?.roles as GuildMemberRoleManager
                        if (!RoleManager_a?.cache?.has(process.env.ADMIN_ROLE_ID || "")) return interaction.reply({content: 'Вы не можете принять эту заявку', ephemeral:true})
                        let msg_a = interaction.message as Message
                        const buttons_a = new MessageActionRow()
                            .addComponents(
                                new MessageButton()
                                    .setCustomId(`form:join:accept:${data[3]}:${data[4]}`)
                                    .setStyle('SUCCESS')
                                    .setLabel('Принять')
                                    .setDisabled(true),
                                new MessageButton()
                                    .setCustomId(`form:join:deny:${data[3]}:${data[4]}`)
                                    .setStyle('DANGER')
                                    .setLabel('Отклонить')
                                    .setDisabled(true),
                                new MessageButton()
                                    .setCustomId(`form:join:check:${data[3]}:${data[4]}`)
                                    .setStyle('SECONDARY')
                                    .setLabel('Проверить')
                                    .setDisabled(true),
                                new MessageButton()
                                    .setCustomId(`form:common:write:join`)
                                    .setStyle('SECONDARY')
                                    .setLabel('Написать'),
                            )
                        await msg_a.edit({components:[buttons_a]})
                        app.panel.runCommand('say Test message')
                        await interaction.reply({content:`Заявка от <@${data[4]}> принята <@${interaction.user.id}>`})
                        try {
                            await interaction.guild?.members?.cache?.get(data[4])?.roles?.add(await interaction.guild.roles.cache.get(process.env.PLAYER_ROLE_ID || "") as RoleResolvable)
                            await interaction.guild?.members?.cache?.get(data[4])?.roles?.remove(await interaction.guild.roles.cache.get(process.env.GUEST_ROLE_ID || "") as RoleResolvable)
                        } catch(err) {console.log(err)}
                        let repl_a = await interaction.fetchReply() as Message
                        await repl_a.pin()
                        break
                    case 'deny':
                        let RoleManager_d = await interaction?.member?.roles as GuildMemberRoleManager
                        if (!RoleManager_d?.cache?.has(process.env.ADMIN_ROLE_ID || "")) return interaction.reply({content: 'Вы не можете отклонить эту заявку', ephemeral:true})
                        interaction.reply(`Принят отказ. Ожидание причины...`)
                        Conversations.denyReason(interaction, data).run()
                        break
                }
            break
        default:
            interaction.reply({content: 'Произошла ошибка', ephemeral: true})
            break

    }
})