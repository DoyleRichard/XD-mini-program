import { miniAppSanbox } from '../miniAppSanbox/miniAppSanbox'

export class JSCore {
	parent: miniAppSanbox = null
	worker: Worker = null

	constructor() {
		this.init()
	}

	async init() {
		const jsContent = await fetch('http://localhost:6325/logic/core.js')
		const codeString = await jsContent.text()
		const jsBlob = new Blob([codeString], { type: 'application/javascript' })
		const urlObj = window.URL.createObjectURL(jsBlob)

		this.worker = new Worker(urlObj)

		setTimeout(() => {
			this.worker.postMessage({
				type: 'test',
				body: { a: 'from Native JSCore.' },
			})
		}, 1000)
	}
}
