import { miniAppSanbox } from '../miniAppSanbox/miniAppSanbox'
import mitt, { Handler } from 'mitt'

export type IType = string
export interface IMsg {
	type: IType
	body: any
}
export class JSCore {
	parent: miniAppSanbox = null
	worker: Worker = null
	event = mitt()

	constructor() {
		this.init()
	}

	async init() {
		const jsContent = await fetch('http://localhost:6325/logic/core.js')
		const codeString = await jsContent.text()
		const jsBlob = new Blob([codeString], { type: 'application/javascript' })
		const urlObj = window.URL.createObjectURL(jsBlob)

		this.worker = new Worker(urlObj)
		this.bindWorkerListener()
	}

	postMessage(msg: IMsg) {
		this.worker.postMessage(msg)
	}

	bindWorkerListener() {
		this.worker.addEventListener('message', e => {
			const msg: IMsg = e.data
			this.event.emit('message', msg)
		})
	}

	addEventListener(type: IType, callback: Handler<any>) {
		this.event.on(type, callback)
	}
}
