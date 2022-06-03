import commands from "../../events/Commands"

export default () => {
	return commands.map(e => e.slashInfo.toJSON())
}