import { ButtonInteraction } from "discord.js"
import App from "../App"

export default class DiscordButton {
    public readonly type: string
    public run(app: App, interaction: ButtonInteraction,data: string[]) {
        console.log(`Executing button action with '${data.join(', ')}' by '${interaction.user.tag}'`)
        this.handler(app, interaction, data)
    }
    private readonly handler: (app: App, interaction: ButtonInteraction,data: string[]) => void
    constructor(
        type: string,
        handler: (app: App, interaction: ButtonInteraction,data: string[]) => void = 
            (app: App, interaction: ButtonInteraction,data: string[]) => {}
    ){
        this.type = type, 
        this.handler = handler
    }
}