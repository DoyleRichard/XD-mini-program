import './device.less'
import DeviceTpl from './device.html'
import { Application } from '../application/application'

export class Device {
	rootElement: Element = document.querySelector('#root')
	appContainer: Element

	constructor() {
		this.rootElement = document.querySelector('#root')
		this.init()
	}

	init() {
		this.rootElement.innerHTML = DeviceTpl
		this.appContainer = document.querySelector('.iphone__apps')
		this.updateDeviceBarColor('balck')
	}

	updateDeviceBarColor(color: 'balck' | 'white' = 'white') {
		const statusBar = this.rootElement.querySelector('.iphone__status-bar')
		const homeBar = this.rootElement.querySelector('.iphone__home-touch-bar')
		if (color === 'white') {
			statusBar.classList.add('iphone__status-bar--white')
			statusBar.classList.remove('iphone__status-bar--black')
			homeBar.classList.add('iphone__home-touch-bar--white')
			homeBar.classList.remove('iphone__home-touch-bar--black')
		}
		if (color === 'balck') {
			statusBar.classList.remove('iphone__status-bar--white')
			statusBar.classList.add('iphone__status-bar--black')
			homeBar.classList.remove('iphone__home-touch-bar--white')
			homeBar.classList.add('iphone__home-touch-bar--black')
		}
	}

	open(app: Application) {
		app.parent = this
		this.appContainer.appendChild(app.rootElement)
	}
}
