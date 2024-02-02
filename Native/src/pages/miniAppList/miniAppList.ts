import './miniAppList.less'
import tpl from './miniAppList.html'

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
	}
}
