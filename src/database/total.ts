import App from "../App";
import DatabaseModule from "../types/DatabaseModule";

export default (app: App) => new DatabaseModule(
    'total',
    'Total',
    (module: DatabaseModule) => async () => {
        return (await app.db.get(module.sheet, 'A2', 'A2'))[0][0] || ""
    },
    (module: DatabaseModule) => async (string) => {
        await app.db.update(module.sheet, 'A2', 'A2', [[string]])
    }
)