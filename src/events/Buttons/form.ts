import { ButtonInteraction } from "discord.js";
import App from "../../App";
import DiscordButton from "../../types/DiscordButton";

export default new DiscordButton('form', (app: App, interaction: ButtonInteraction, data: string[]) => {
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
                        app.panel.runCommand('say Test message')
                        interaction.reply({content:`Заявка от <@${data[4]}> принята <@${interaction.user.id}>`})
                        break
                }
            break
        default:
            interaction.reply({content: 'Произошла ошибка', ephemeral: true})
            break

    }
})