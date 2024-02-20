import { PageInstance } from '@native/pages/page'
import { Device } from '../device/device'
import './application.less'
import { MiniAppList } from '@native/pages/miniAppList/miniAppList'
import { sleep } from '@native/utils/util'

export class Application {
	RootElement: HTMLDivElement = document.createElement('div')
	windowElement: HTMLDivElement
	viewList: PageInstance[] = []
	rootView: PageInstance
	parent: Device
	done: Boolean = true

	constructor() {
		this.init()
	}

	init() {
		this.RootElement.classList.add('wx-application')
		this.windowElement = document.createElement('div')
		this.windowElement.classList.add('wx-native-window')
		this.RootElement.appendChild(this.windowElement)
	}

	initRootView(view: PageInstance) {
		this.rootView = view
		this.viewList.push(view)
		view.parent = this
		view.rootElement.classList.add('wx-native-view--instage')
		view.rootElement.style.zIndex = '1'
		this.windowElement.appendChild(view.rootElement)
	}

	async pushView(view: MiniAppList) {
		if (!this.done) {
			return
		}
		this.done = false

		const preView = this.viewList[this.viewList.length - 1]

		view.parent = this
		this.viewList.push(view)
		view.rootElement.style.zIndex = `${this.viewList.length}`
		view.rootElement.classList.add('wx-native-view--before-enter')
		this.windowElement.append(view.rootElement)
		await sleep(1)

		preView.rootElement.classList.remove('wx-native-view--instage')
		preView.rootElement.classList.add('wx-native-view--slide-out')
		preView.rootElement.classList.add('wx-native-view--linear-anima')

		view.rootElement.classList.add('wx-native-view--enter-anima')
		view.rootElement.classList.add('wx-native-view--instage')
		await sleep(540)
		this.done = true

		preView.rootElement.classList.remove('wx-native-view--linear-anima')
		view.rootElement.classList.remove('wx-native-view--before-enter')
		view.rootElement.classList.remove('wx-native-view--enter-anima')
		view.rootElement.classList.remove('wx-native-view--instage')
	}

	async popView() {
		if (this.viewList.length < 2) {
			return
		}

		if (!this.done) {
			return
		}

		this.done = false

		const lowerView = this.viewList[this.viewList.length - 2]
		const upperView = this.viewList[this.viewList.length - 1]

		lowerView.rootElement.classList.remove('wx-native-view--slide-out')
		lowerView.rootElement.classList.add('wx-native-view--instage')
		lowerView.rootElement.classList.add('wx-native-view--enter-anima')

		upperView.rootElement.classList.remove('wx-native-view--instage')
		upperView.rootElement.classList.add('wx-native-view--before-enter')
		upperView.rootElement.classList.add('wx-native-view--enter-anima')
		await sleep(540)
		this.done = true
		this.viewList.pop()
		this.windowElement.removeChild(upperView.rootElement)

		lowerView.rootElement.classList.remove('wx-native-view--enter-anima')
	}
}
