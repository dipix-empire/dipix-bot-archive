import { REST } from "@discordjs/rest"
import { Collection, Guild } from "discord.js"
import { Routes } from "discord-api-types"

export default async (json: any[], guilds: Collection<string, Guild>) => {
	const rest = new REST({version: '9'}).setToken(process.env.TOKEN || "")
	guilds.forEach(async g => {
		await rest.put(Routes.applicationGuildCommands(process.env.CLIENT || "", g.id))
		console.log(`Upload ${json.length} commands to "${g.name}" guild (id: ${g.id}).`)
	})
}