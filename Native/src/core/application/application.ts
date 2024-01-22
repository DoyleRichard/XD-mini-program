import { PageInstance } from '@native/pages/page'
import { Device } from '../device/device'
import './application.less'

export class Application {
	RootElement: HTMLDivElement = document.createElement('div')
	windowElement: HTMLDivElement
	viewList: PageInstance[] = []
	rootView: PageInstance
	parent: Device

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
}
