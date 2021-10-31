import Collection from '@discordjs/collection'
import { JWT } from 'google-auth-library'
import { google } from 'googleapis' 
import App from '../App'
import database from '../database'
import DatabaseModule from './DatabaseModule'

export default class Database{
    private readonly id: string
    private readonly jwt: JWT
    private static readonly sheets = google.sheets('v4')
    public readonly connect = async () => await this.jwt.authorize()
    public async get(sheet: string, start:string, end: string): Promise<string[][]> {
        let res = await Database.sheets.spreadsheets.values.get({
            auth: this.jwt,
            spreadsheetId: this.id,
            range: `${sheet}!${start}:${end}`
        })
        return res.data.values || []
    }
    public async update(sheet: string, start: string, end: string, data: string[][]) {
        await Database.sheets.spreadsheets.values.update({
            auth: this.jwt,
            spreadsheetId: process.env.SHEET_ID,
            range: `${sheet}!${start}:${end}`,          
            valueInputOption:'RAW',
            requestBody: {
                values: data
            }
        })
    }
    public async clear(sheet: string, start: string, end: string){
        await Database.sheets.spreadsheets.values.clear({
            auth: this.jwt,
            spreadsheetId: this.id,
            range: `${sheet}!${start}:${end}`
        })
    }
    public modules: Collection<string, DatabaseModule>
    constructor(app: App,id: string, keyPath: string){
        this.id = id
        let key = require(`../../${keyPath}`)
        this.jwt = new google.auth.JWT(
            key.client_email,
            keyPath,
            key.private_key,
		    ['https://www.googleapis.com/auth/spreadsheets']
        )
        this.modules = new Collection<string, DatabaseModule>()
        database.forEach(e => {
            let module = e(app)
            this.modules.set(module.name, module)
        })
    }
}