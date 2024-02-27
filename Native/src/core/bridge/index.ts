import { miniAppSanbox } from '../miniAppSanbox/miniAppSanbox'

export class Bridge {
	id: string = `bridge_${Math.random().toString()}`
	webview: any = null
	jscore: any = null
	parent: miniAppSanbox = null
	opts: any = {}

	constructor(opts: any) {
		this.opts = opts
	}
}
