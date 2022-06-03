import Controller from "../types/Controller";
import App from "../App";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types";
import prepareCommands from "../tasks/ready/prepareCommands";
import uploadCommands from "../tasks/ready/uploadCommands";
export default new Controller<{status: number}>(
	"ready.main",
	async (app: App) => {
		console.log(`Start with tag: ${app.bot.user?.tag}`)
		await uploadCommands(prepareCommands(), app.bot.guilds.cache) 
		return { status: 0 }
	}, (err) => {
		return {status: -1}
	}
)