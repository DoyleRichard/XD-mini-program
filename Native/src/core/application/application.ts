import { PageInstance } from '@native/pages/page'
import { Device } from '../device/device'
import './application.less'
import { MiniAppList } from '@native/pages/miniAppList/miniAppList'
import { sleep } from '@native/utils/util'
import { miniAppSanbox } from '../miniAppSanbox/miniAppSanbox'

export class Application {
	rootElement: HTMLDivElement = document.createElement('div')
	windowElement: HTMLDivElement
	viewList: PageInstance[] = []
	rootView: PageInstance
	parent: Device
	done: Boolean = true

	constructor() {
		this.init()
	}

	init() {
		this.rootElement.classList.add('wx-application')
		this.windowElement = document.createElement('div')
		this.windowElement.classList.add('wx-native-window')
		this.rootElement.appendChild(this.windowElement)
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

	async presentView(view: miniAppSanbox, useCache = false) {
		if (!this.done) {
			return
		}
		this.done = false

		const preView = this.viewList[this.viewList.length - 1]

		view.parent = this
		view.rootElement.style.zIndex = `${this.viewList.length + 1}`
		view.rootElement.classList.add('wx-native-view--before-present')
		view.rootElement.classList.add('wx-native-view--enter-anima')
		preView.rootElement.classList.add('wx-native-view--before-presenting')
		preView.rootElement.classList.remove('wx-native-view--instage')
		preView.rootElement.classList.add('wx-native-view--enter-anima')
		// preView.onPresentOut && preView.onPresentOut();
		// view.onPresentIn && view.onPresentIn();
		!useCache && this.rootElement.appendChild(view.rootElement)
		this.viewList.push(view)
		!useCache && view.viewDidLoad && view.viewDidLoad()
		await sleep(20)
		preView.rootElement.classList.add('wx-native-view--presenting')
		view.rootElement.classList.add('wx-native-view--instage')
		await sleep(540)
		this.done = true
		view.rootElement.classList.remove('wx-native-view--before-present')
		view.rootElement.classList.remove('wx-native-view--enter-anima')
		preView.rootElement.classList.remove('wx-native-view--enter-anima')
		preView.rootElement.classList.remove('wx-native-view--before-presenting')
	}
}
