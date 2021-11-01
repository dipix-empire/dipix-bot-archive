import App from "../App"

export default class DatabaseModule {
    name: string
    sheet: string
    get: (...data: any[]) => Promise<string>
    update: (...data: any[]) => void
    constructor(
        name: string,
        sheet: string,
        get: (module: DatabaseModule) => (...data: any[]) => Promise<string>,
        update: (module: DatabaseModule) => (...data: any[]) => void
    ) {
        this.name = name
        this.sheet = sheet
        this.get = get(this)
        this.update = update(this)
    }
}