import { EventEmitter } from "stream";
import WebSocket from "ws";

export default class ServerTap extends EventEmitter {
	private ws: WebSocket | null = null;
	private lastTimeout = 0
	
	private reconnect(url: string, key: string) {
		this.lastTimeout += 5000
		setTimeout(() => this.connect(url, key), this.lastTimeout)
	}

	private connect(url: string, key: string) {
		try {
			this.ws = new WebSocket(url, [], {
				headers: {
					'Cookie': `x-servertap-key=${key}`
				}
			})
			this.ws.on('open', (...data) => {
				console.log('Connected to server')
				super.emit('open', ...data)
				this.lastTimeout = 0
			})
			this.ws.on('close', () => {
				super.emit('close', this.lastTimeout + 5000)
				this.ws = null
				this.reconnect(url, key)
			})
			this.ws.on('message', (...data) => super.emit('message', ...data))
			this.ws.on('error', (err) => {
				console.log(err)
			})
		} catch (err) {
			console.log(err)
			this.reconnect(url, key)
		}
	}

	public send(message: string) {
		this.ws?.send(message)
	}
	
	constructor(url: string, key: string) {
		super()
		this.connect(url, key)
	}
}