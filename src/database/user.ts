import App from "../App"
import DatabaseModule from "../types/DatabaseModule"

export default (app: App) => new DatabaseModule(
    'user',
    'User',
    (module: DatabaseModule) => async () => {
        let last = JSON.parse(await app.db.modules.get('total')?.get() || '{}')?.lastFree?.user
        if (!last) return ""
        let data = (await app.db.get(module.sheet, 'A2', `B${last}`))
        let res: {[key: string]: Object} = {}
        data.forEach(e => {
            res[e[0]] = JSON.parse(e[1])
        })
        
        console.log('ans: ', res)
        return JSON.stringify(res)
    },
    (module: DatabaseModule) => async (string) => {
        let data = JSON.parse(string)
        let keys = Object.keys(data)
        let newLast = keys.length + 2
        let newData: string[][] = []
        keys.forEach(e => {
            newData.push([e, JSON.stringify(data[e])])
        })
        await app.db.update(module.sheet, 'A2', `B${newLast-1}`, newData)
        let totalData = JSON.parse(await app.db.modules.get('total')?.get() || '{}')
        if (totalData) {
            totalData.lastFree.user = newLast
            await app.db.modules.get('total')?.update(JSON.stringify(totalData))
        }
    }
)