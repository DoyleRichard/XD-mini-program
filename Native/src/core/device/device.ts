import './device.less'
import DeviceTpl from './device.html'
import { Application } from '../application/application'

export class Device {
	RootElement: Element = document.querySelector('#root')
	appContainer: Element

	constructor() {
		this.RootElement = document.querySelector('#root')
		this.init()
	}

	init() {
		this.RootElement.innerHTML = DeviceTpl
		this.appContainer = document.querySelector('.iphone__apps')
		this.updateDeviceBarColor('balck')
	}

	updateDeviceBarColor(color: 'balck' | 'white' = 'white') {
		const statusBar = this.RootElement.querySelector('.iphone__status-bar')
		const homeBar = this.RootElement.querySelector('.iphone__home-touch-bar')
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
		this.appContainer.appendChild(app.RootElement)
	}
}
