import mitt, { Handler } from 'mitt'

export type IType = string
export interface IMsg {
	type: IType
	body: any
}

class Message {
	event = mitt()

	constructor() {
		this.init()
	}

	init() {
		global.addEventListener('message', e => {
			const msg: IMsg = e.data
			const { type, body } = msg
			this.event.emit(type, body)
		})
	}

	receive(type: IType, callback: Handler<any>) {
		this.event.on(type, callback)
	}

	send(msg: IMsg) {
		global.postMessage(msg)
	}
}

export default new Message()
