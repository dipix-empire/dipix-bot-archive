import App from "../App"

export default class Button {
    public readonly name: string
    public readonly handler: (app: App) => (params: string[]) => void
    constructor (
        name: string,
        handler: (app: App) => (params: string[]) => void = (app: App) => (params: string[]) => { return }
    ) {
        this.name = name
        this.handler = handler
    }
}