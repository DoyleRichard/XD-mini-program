import { IMsg, JSCore } from '../jscore'
import { miniAppSandbox } from '../miniAppSandbox/miniAppSandbox'

export type IBridgeOpts = {
	jscore: JSCore
}
export class Bridge {
	id: string = `bridge_${Math.random().toString()}`
	webview: any = null
	jscore: JSCore = null
	parent: miniAppSandbox = null
	opts: any = {}

	constructor(opts: IBridgeOpts) {
		this.opts = opts
		this.jscore = opts.jscore
		this.jscore.addEventListener('message', this.jscoreMessageHandler.bind(this))
	}

	jscoreMessageHandler(msg: IMsg) {
		console.log('native bridge: ', msg)
	}
}
