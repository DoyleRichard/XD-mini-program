import './miniAppList.less'
import tpl from './miniAppList.html'
import miniAppListData from '@native/static/miniAppList'

export class MiniAppList {
	id: string = Math.random().toString()
	rootElement: HTMLDivElement = document.createElement('div')
	parent: any = null

	constructor() {
		this.rootElement.classList.add('wx-native-view')
		this.viewDidLoad()
	}

	viewDidLoad() {
		this.rootElement.innerHTML = tpl
		this.bindReturnEvent()
		this.createAppList()
	}

	bindReturnEvent() {
		const btn = this.rootElement.querySelector('.weixin-app-navigation__left-btn') as HTMLElement
		btn.onclick = () => {
			this.jumpBack()
		}
	}

	jumpBack() {
		this.parent.popView()
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
}
