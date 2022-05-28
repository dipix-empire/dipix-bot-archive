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
                        if (app.buffer.get(`button:form:${data[3]}`)) return interaction.reply({content:'К заявке применено другое действие. Пожалуйста, подождите...', ephemeral:true}) 
                        app.buffer.set(`button:form:${data[3]}`, true)
                        let RoleManager_a = await interaction?.member?.roles as GuildMemberRoleManager
                        if (!RoleManager_a?.cache?.has(process.env.ADMIN_ROLE_ID || "")) { 
                            app.buffer.delete(`button:form:${data[3]}`)
                            return interaction.reply({content: 'Вы не можете принять эту заявку', ephemeral:true})
                        }
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
                        // app.panel.runCommand(`whitelist add ${form_data[1]}`)
                        app.servertap.send(`whitelist add ${form_data[1]}`)
                        await interaction.reply({content:`Заявка от <@${data[4]}> принята <@${interaction.user.id}>`})

                        let forms_data = JSON.parse(await app.db.modules.get('forms')?.get() || "")
                        forms_data[data[3]] = form_data
                        app.db.modules.get('forms')?.update(JSON.stringify(forms_data))
                        let users = JSON.parse(await app.db.modules.get('user')?.get() || "{}")
                        users[data[4]] = {nickname: form_data[1], age: form_data[2], req: data[3]}
                        app.db.modules.get('user')?.update(JSON.stringify(users))
                        
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
                        app.buffer.delete(`button:form:${data[3]}`)
                        break
                    case 'deny':
                        if (app.buffer.get(`button:form:${data[3]}`)) return interaction.reply({content:'К заявке применено другое действие. Пожалуйста, подождите...', ephemeral:true}) 
                        app.buffer.set(`button:form:${data[3]}`, true)
                        let RoleManager_d = await interaction?.member?.roles as GuildMemberRoleManager
                        if (!RoleManager_d?.cache?.has(process.env.ADMIN_ROLE_ID || "")) {
                            app.buffer.delete(`button:form:${data[3]}`)
                            return interaction.reply({content: 'Вы не можете отклонить эту заявку', ephemeral:true})
                        }
                        interaction.reply(`Принят отказ. Ожидание причины...`)
                        Conversations.denyReason(app, interaction, data).run()
                        break
                    case 'check':
                        if (app.buffer.get(`button:form:${data[3]}`)) return interaction.reply({content:'К заявке применено другое действие. Пожалуйста, подождите...', ephemeral:true}) 
                        app.buffer.set(`button:form:${data[3]}`, true)
                        interaction.reply({content: "Запрошена проверка на уникальность, ожидение результата..."})
                        let cross = ""
                        let forms = JSON.parse(await app.db.modules.get('forms')?.get() || "{}")
                        let answers = (app.buffer.get(`form:join:${data[4]}`) as any)
                        Object.keys(forms).forEach(e => {
                            for (let i = 4; i < 6; i++)
                                if (forms[e][i].toLowerCase() == answers[i].toLowerCase() && answers[i].toLowerCase() != '-') cross+= `Ответ на вопрос №${i} совпадает с ответом в заявке <#${e}>\n`
                        })
                        interaction.editReply(`Результат проверки:\n${ cross ? cross : `Совпадений не обнаружено` }`)
                        app.buffer.delete(`button:form:${data[3]}`)
                        break
                }
            break
        default:
            interaction.reply({content: 'Произошла ошибка', ephemeral: true})
            break

    }
})
