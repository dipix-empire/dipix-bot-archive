import App from './src/App'
import DotEnv from 'dotenv'
DotEnv.config()

// window.document.cookie = "x-servertap-key=AJHSDGJKSKJGHSDJGHJSDKVJ_EFKJBJB76876VVEHFVJ"

let app = new App(
    process.env.TOKEN,
    {
        id: process.env.SHEET_ID,
        keyPath: process.env.GOOGLE_APPLICATION_CREDENTIALS
    },
    {
        url: 'ws://localhost:4567/v1/ws/console',
        key: process.env.SERVERTAP_KEY || ""
    }
);
(async () => {
    await app.load()
    app.start()  
})()
