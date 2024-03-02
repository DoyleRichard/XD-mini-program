import { IMsg, JSCore } from '../jscore'
import { miniAppSandbox } from '../miniAppSandbox/miniAppSandbox'
import { Webview } from '../webview/webview'

export type IBridgeOpts = {
	jscore: JSCore
	configInfo: Record<string, any>
	isRoot: boolean
}
export class Bridge {
	id: string = `bridge_${Math.random().toString()}`
	webview: any = null
	jscore: JSCore = null
	parent: miniAppSandbox = null
	opts: IBridgeOpts = null

	constructor(opts: IBridgeOpts) {
		this.opts = opts
		this.jscore = opts.jscore
		this.jscore.addEventListener('message', this.jscoreMessageHandler.bind(this))
	}

	jscoreMessageHandler(msg: IMsg) {
		console.log('native bridge: ', msg)
	}

	init() {
		this.webview = this.createWebview()
	}

	createWebview() {
		const webview = new Webview({
			configInfo: this.opts.configInfo,
			isRoot: this.opts.isRoot,
		})
		webview.parent = this
		this.parent.webviewsContainer.appendChild(webview.rootElement)
	}
}
