import './home.less'
import tpl from './home.html'
import { Application } from '@native/core/application/application'
import { PageInstance } from '../page'

export class Home extends PageInstance {
	id: string = Math.random().toString()
	rootElement: HTMLDivElement = document.createElement('div')
	parent: Application

	constructor() {
		super()
		this.rootElement.classList.add('wx-native-view')
		this.viewDidLoad()
	}

	viewDidLoad() {
		this.rootElement.innerHTML = tpl
	}
}
