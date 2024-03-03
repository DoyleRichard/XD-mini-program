import './miniAppSandbox.less'
import tpl from './miniAppSandbox.html'
import { PageInstance } from '@native/pages/page'
import { Application } from '../application/application'
import { IBarColor } from '../device/device'
import { AppManager } from '../appManager/appManager'
import { mergePageConfig, readFile, sleep } from '@native/utils/util'
import { Bridge, IBridgeOpts } from '../bridge'
import { IMsg, JSCore } from '../jscore'

export type IAppInfo = {
	appId: string
	scene: number
	appName: string
	logo: string
	pagePath: string
	query: Record<string, any>
}

export type IAppConfig = {
	app: Record<string, any>
	modules: Record<string, any>
}
export class miniAppSandbox extends PageInstance {
	id: string = Math.random().toString()
	appInfo: IAppInfo = null
	parent: Application = null
	rootElement = document.createElement('div')
	appConfig: IAppConfig = null
	bridgeList: Bridge[] = []
	jscore: JSCore = new JSCore()
	webviewsContainer: HTMLDivElement = null

	constructor(opts: IAppInfo) {
		super()
		this.appInfo = opts
		this.jscore.parent = this
		this.rootElement.classList.add('wx-native-view')
	}

	viewDidLoad() {
		this.initPageFrame()
		this.showLaunchScreen()
		this.bindCloseEvent()
		this.initPage()
	}

	async initPage() {
		await this.jscore.init()
		this.jscore.addEventListener('message', this.jscoreMessageHandler.bind(this))
		this.jscore.postMessage({ type: 'test', body: { a: 'from native miniAppSandbox' } })

		const configPath = `${this.appInfo.appId}/config.json`
		const configContent = await readFile(configPath)
		this.appConfig = JSON.parse(configContent)
		const entryPagePath: string = this.appInfo.pagePath || this.appConfig.app.entryPagePath
		this.updateTargetPageColorStyle(entryPagePath)

		const pageConfig = this.appConfig.modules[entryPagePath]
		const entryPageBridge = this.createBridge({
			jscore: this.jscore,
			configInfo: mergePageConfig(this.appConfig.app, pageConfig),
			isRoot: true,
		})
		this.bridgeList.push(entryPageBridge)
		console.log(this.bridgeList)

		// 模拟2秒加载时间
		await sleep(2000)
		this.hideLaunchScreen()
	}

	createBridge(opts: IBridgeOpts) {
		const bridge = new Bridge(opts)
		bridge.parent = this
		bridge.init()

		return bridge
	}

	initPageFrame() {
		this.rootElement.innerHTML = tpl
		this.webviewsContainer = this.rootElement.querySelector('.wx-mini-app__webviews')
	}

	showLaunchScreen() {
		const launchScreen = this.rootElement.querySelector('.wx-mini-app__launch-screen') as HTMLDivElement
		const name = this.rootElement.querySelector('.wx-mini-app__name')
		const logo = this.rootElement.querySelector('.wx-mini-app__logo-img-url') as HTMLImageElement

		this.updateActionColorStyle('black')
		name.innerHTML = this.appInfo.appName
		logo.src = this.appInfo.logo
		launchScreen.style.display = 'block'
	}

	hideLaunchScreen() {
		const startPage = this.rootElement.querySelector('.wx-mini-app__launch-screen') as HTMLDivElement
		startPage.style.display = 'none'
	}

	updateActionColorStyle(color: IBarColor) {
		const action = this.rootElement.querySelector('.wx-mini-app-navigation__actions')

		if (color === 'white') {
			action.classList.remove('wx-mini-app-navigation__actions--black')
			action.classList.add('wx-mini-app-navigation__actions--white')
		}

		if (color === 'black') {
			action.classList.remove('wx-mini-app-navigation__actions--white')
			action.classList.add('wx-mini-app-navigation__actions--black')
		}

		this.parent.updateStatusBarColor(color)
	}

	updateTargetPageColorStyle(pagePath: string) {
		const pageConfig = this.appConfig.modules[pagePath]
		const mergeConfig = mergePageConfig(this.appConfig.app, pageConfig)

		this.updateActionColorStyle(mergeConfig.navigationBarTextStyle)
	}

	bindCloseEvent() {
		const btn = this.rootElement.querySelector('.wx-mini-app-navigation__actions-close') as HTMLLIElement
		btn.onclick = () => {
			AppManager.closeApp(this)
		}
	}

	onPresentIn() {
		console.log('miniAppSandbox onPresentIn')
	}

	onPresentOut() {
		console.log('miniAppSandbox onPresentOut')
	}

	jscoreMessageHandler(msg: IMsg) {
		console.log('native miniAppSandbox: ', msg)
	}
}
