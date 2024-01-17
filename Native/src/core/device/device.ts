import './device.less'
import DeviceTpl from './device.html'

export class Device {
	RootElement: Element

	constructor() {
		this.RootElement = document.querySelector('#root')
		this.init()
	}

	init() {
		this.RootElement.innerHTML = DeviceTpl
	}
}
