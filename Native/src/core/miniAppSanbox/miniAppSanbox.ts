import './miniAppSanbox.less'
import tpl from './miniAppSanbox.html'
import { PageInstance } from '@native/pages/page'
import { Application } from '../application/application'
import { IBarColor } from '../device/device'
import { AppManager } from '../appManager/appManager'
import { mergePageConfig, readFile } from '@native/utils/util'

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
export class miniAppSanbox extends PageInstance {
	id: string = Math.random().toString()
	appInfo: IAppInfo = null
	parent: Application = null
	rootElement = document.createElement('div')
	appConfig: IAppConfig = null

	constructor(opts: IAppInfo) {
		super()
		this.appInfo = opts
		this.rootElement.classList.add('wx-native-view')
	}

	viewDidLoad() {
		this.initPageFrame()
		this.showLaunchScreen()
		this.bindCloseEvent()
		this.initPage()
	}

	async initPage() {
		const configPath = `${this.appInfo.appId}/config.json`
		const configContent = await readFile(configPath)
		this.appConfig = JSON.parse(configContent)
		const entryPagePath: string = this.appInfo.pagePath || this.appConfig.app.entryPagePath
		this.updateTargetPageColorStyle(entryPagePath)
		this.hideLaunchScreen()
	}

	initPageFrame() {
		this.rootElement.innerHTML = tpl
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

	hideLaunchScreen() {}

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
		console.log('miniAppSanbox onPresentIn')
	}

	onPresentOut() {
		console.log('miniAppSanbox onPresentOut')
	}
}
