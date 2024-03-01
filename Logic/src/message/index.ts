import mitt from 'mitt'

export type IType = any
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

	receive(type: IType, callback: any) {
		this.event.on(type, callback)
	}
}

export default new Message()
