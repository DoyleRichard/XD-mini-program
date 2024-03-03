import './webview.less'
import tpl from './webview.html'
import { Bridge } from '../bridge'
import { IMsg } from '../jscore'

export type IWebviewOpts = {
	configInfo: Record<string, any>
	isRoot: boolean
}
export class Webview {
	id: string = `webview_${Math.random().toString()}`
	rootElement = document.createElement('div')
	opts: IWebviewOpts = null
	parent: Bridge = null
	iframe: HTMLIFrameElement = null

	constructor(opts: IWebviewOpts) {
		this.opts = opts
		this.rootElement.classList.add('wx-native-view')
		this.rootElement.innerHTML = tpl
		this.setInitialStyle()
		this.iframe = this.rootElement.querySelector('.wx-native-webview__window')
		this.iframe.name = this.id
	}

	async init(callback: () => any) {
		await this.frameLoaded()
		callback()
	}

	postMessage(msg: IMsg) {
		const iframeWindow = window.frames[this.iframe.name as keyof Window['frames']]
		console.log('iframeWindow ', iframeWindow)
		iframeWindow.JSBridge.onReceiveNativeMessage(msg)
	}

	frameLoaded() {
		return new Promise<void>(resolve => {
			this.iframe.onload = () => {
				resolve()
			}
		})
	}

	setInitialStyle() {
		const config = this.opts.configInfo
		console.log(config)
		const webview = this.rootElement.querySelector('.wx-native-webview') as HTMLDivElement
		const pageName = this.rootElement.querySelector('.wx-native-webview__navigation-title') as HTMLDivElement
		const navigationBar = this.rootElement.querySelector('.wx-native-webview__navigation') as HTMLDivElement
		const leftBtn = this.rootElement.querySelector('.wx-native-webview__navigation-left-btn') as HTMLDivElement
		const root = this.rootElement.querySelector('.wx-native-webview__root') as HTMLDivElement

		if (this.opts.isRoot) {
			leftBtn.style.display = 'none'
		} else {
			leftBtn.style.display = 'block'
		}

		if (config.navigationBarTextStyle === 'white') {
			navigationBar.classList.add('wx-native-webview__navigation--white')
		} else {
			navigationBar.classList.add('wx-native-webview__navigation--black')
		}

		if (config.navigationStyle === 'custom') {
			webview.classList.add('wx-native-webview--custom-nav')
		}

		root.style.backgroundColor = config.backgroundColor
		navigationBar.style.backgroundColor = config.navigationBarBackgroundColor
		pageName.innerText = config.navigationBarTitleText
	}
}
