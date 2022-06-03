import App from "../App"

export default class Controller<T extends {status: number}> {
	private readonly name: string
	private readonly actions: (app: App, ...data: any[]) => T | Promise<T>
	private readonly catcher: (err: Error | unknown) => T
	
	public async run(app: App, ...data: any[]) {
		let res: T = {} as T
		try {
			res = await this.actions(app, ...data)
		} catch (err) {
			console.log(err)
			res = this.catcher(err)
		} finally {
			console.log(`Actions from ${this.name} controller fulfilled with status code ${res.status}`)
		}
	}

	constructor (
		name: string,
		actions: (app: App, ...data: any[]) => T | Promise<T>,
		catcher: (err: Error | unknown) => T
	) {
		this.name = name
		this.actions = actions
		this.catcher = catcher
	}
}