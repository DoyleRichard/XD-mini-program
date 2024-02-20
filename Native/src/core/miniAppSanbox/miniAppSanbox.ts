import './miniAppSanbox.less'
import tpl from './miniAppSanbox.html'
import { PageInstance } from '@native/pages/page'

export class miniAppSanbox extends PageInstance {
	appInfo: any = null
	parent: any = null
	rootElement = document.createElement('div')

	constructor(opts: {
		appId: string
		scene: number
		appName: string
		logo: string
		pagePath: string
		query: Record<string, any>
	}) {
		super()
		this.appInfo = opts
		this.rootElement.classList.add('wx-native-view')
	}

	viewDidLoad() {
		this.initPageFrame()
	}

	initPageFrame() {
		this.rootElement.innerHTML = tpl
	}

	onPresentIn() {
		// const currentBridge = this.bridgeList[this.bridgeList.length - 1];
		// currentBridge && currentBridge.appShow();
		// currentBridge && currentBridge.pageShow();
		// currentBridge && this.updateTargetPageColorStyle(currentBridge.opts.pagePath);
	}

	onPresentOut() {
		// const currentBridge = this.bridgeList[this.bridgeList.length - 1];
		// currentBridge && currentBridge.appHide();
		// currentBridge && currentBridge.pageHide();
	}
}
