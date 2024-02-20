import './miniAppList.less'
import tpl from './miniAppList.html'
import miniAppListData from '@native/static/miniAppList'
import { closest } from '@native/utils/util'
import { AppManager } from '@native/core/appManager/appManager'
import { Application } from '@native/core/application/application'

export type IMiniAppInfo = (typeof miniAppListData)[0]
export class MiniAppList {
	id: string = Math.random().toString()
	rootElement: HTMLDivElement = document.createElement('div')
	parent: Application = null

	constructor() {
		this.rootElement.classList.add('wx-native-view')
		this.viewDidLoad()
	}

	viewDidLoad() {
		this.rootElement.innerHTML = tpl
		this.bindReturnEvent()
		this.bindOpenMiniApp()
		this.createAppList()
	}

	bindReturnEvent() {
		const btn = this.rootElement.querySelector('.weixin-app-navigation__left-btn') as HTMLElement
		btn.onclick = () => {
			this.parent.popView()
		}
	}

	createAppList() {
		const list = this.rootElement.querySelector('.weixin-app__mini-used-list')

		miniAppListData.forEach(miniAppInfo => {
			const item = `
				<li class="weixin-app__mini-used-list-item" data-appid="${miniAppInfo.appId}">
					<div class="weixin-app__mini-used-logo">
						<img src="${miniAppInfo.logo}" >
					</div>
					<p class="weixin-app__mini-used-name">${miniAppInfo.name}</p>
				</li>
			`
			const tempDivElement = document.createElement('div')

			tempDivElement.innerHTML = item
			list.appendChild(tempDivElement.children[0])
		})
	}

	bindOpenMiniApp() {
		const appList = this.rootElement.querySelector('.weixin-app__mini-used-list') as HTMLElement

		appList.onclick = e => {
			const target = e.target as Element
			const app = closest(target, 'weixin-app__mini-used-list-item')

			if (!app) {
				return
			}

			const appId = app.getAttribute('data-appid')
			const appInfo = this.getAppInfoByAppId(appId)

			if (!appInfo) {
				return
			}

			AppManager.openApp(
				{
					appId,
					path: appInfo.path,
					scene: 1001,
				},
				this.parent
			)
		}
	}

	getAppInfoByAppId(appId: string): IMiniAppInfo {
		let appInfo = null as IMiniAppInfo
		miniAppListData.forEach(miniAppInfo => {
			if (miniAppInfo.appId === appId) {
				appInfo = miniAppInfo
			}
		})

		return appInfo
	}
}
