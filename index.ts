import App from './src/App'
import DotEnv from 'dotenv'
DotEnv.config()
let app = new App(
    process.env.TOKEN,
    {
        host: process.env.PANELHOST,
        key: process.env.PTERODACTYL,
        id: process.env.PANEL_ID
    },
    {
        id: process.env.SHEET_ID,
        keyPath: process.env.GOOGLE_APPLICATION_CREDENTIALS
    }
);
(async () => {
    await app.load()
    app.start()  
})()
