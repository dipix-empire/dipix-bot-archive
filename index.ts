import App from './src/App'
import DotEnv from 'dotenv'
DotEnv.config()

new App(
    process.env.TOKEN,
    process.env.DB,
    {
        host: process.env.PANELHOST,
        key: process.env.PTERODACTYL,
        id: process.env.PANEL_ID
    }
).load().start()