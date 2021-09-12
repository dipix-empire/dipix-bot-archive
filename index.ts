import App from './src/App'
import DotEnv from 'dotenv'
DotEnv.config()

new App(
    process.env.TOKEN,
    process.env.DB
).load().start()