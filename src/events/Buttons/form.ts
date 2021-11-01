import { ButtonInteraction, GuildMemberRoleManager, Message, MessageActionRow, MessageButton, Role, RoleResolvable, ThreadChannel } from "discord.js";
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
                        let form_data = (app.buffer.get(`form:join:${data[4]}`) as any)
                        app.panel.runCommand(`easywl add ${form_data[1]}`)
                        let forms_data = JSON.parse(await app.db.modules.get('forms')?.get() || "")
                        forms_data[data[3]] = form_data
                        app.db.modules.get('forms')?.update(JSON.stringify(forms_data))
                        await interaction.reply({content:`Заявка от <@${data[4]}> принята <@${interaction.user.id}>`})
                        try {
                            let user = await interaction.guild?.members?.cache?.get(data[4])
                            await user?.roles?.add(await interaction?.guild?.roles?.cache?.get(process.env.PLAYER_ROLE_ID || "") as RoleResolvable)
                            await user?.roles?.remove(await interaction?.guild?.roles?.cache?.get(process.env.GUEST_ROLE_ID || "") as RoleResolvable)
                            let gender_ans = form_data[7]
                            let gender_role = ''
                            switch ((gender_ans as string)?.slice()?.toLowerCase()) {
                                case 'm':
                                case 'м':
                                case 'b':
                                case 'ю':
                                    gender_role = process.env.MALE_ROLE_ID || ''
                                    break
                                case 'f':
                                case 'ж':
                                case 'д':
                                case 'g':
                                    gender_role = process.env.MALE_ROLE_ID || ''
                                    break
                                default:
                                    gender_role = process.env.NOT_STATED_GENDER_ROLE_ID || ''
                            }
                            await user?.roles?.add(await interaction?.guild?.roles?.cache?.get(gender_role) as RoleResolvable)
                        } catch(err) {console.log(err)}
                        let repl_a = await interaction.fetchReply() as Message
                        await repl_a.pin()
                        let thread_a = await app.bot.channels.cache.get(data[3])
                        if (thread_a?.isThread()) { 
                            let tread = thread_a as ThreadChannel
                            tread?.setAutoArchiveDuration(60)
                        }
                        app.buffer.delete(`form:join:${data[4]}`)
                        break
                    case 'deny':
                        let RoleManager_d = await interaction?.member?.roles as GuildMemberRoleManager
                        if (!RoleManager_d?.cache?.has(process.env.ADMIN_ROLE_ID || "")) return interaction.reply({content: 'Вы не можете отклонить эту заявку', ephemeral:true})
                        interaction.reply(`Принят отказ. Ожидание причины...`)
                        Conversations.denyReason(app, interaction, data).run()
                        break
                }
            break
        default:
            interaction.reply({content: 'Произошла ошибка', ephemeral: true})
            break

    }
})