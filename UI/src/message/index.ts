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
		window.JSBridge.onReceiveNativeMessage = (msg: IMsg) => {
			const { type, body } = msg
			this.event.emit(type, body)
		}
	}

	receive(type: IType, callback: Handler<any>) {
		this.event.on(type, callback)
	}

	send(msg: IMsg) {}
}

export default new Message()
