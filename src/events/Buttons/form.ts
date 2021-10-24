import { ButtonInteraction, Message, MessageActionRow, MessageButton } from "discord.js";
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
                        let repl_a = await interaction.fetchReply() as Message
                        await repl_a.pin()
                        break
                    case 'deny':
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