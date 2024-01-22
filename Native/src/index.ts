import '@native/less/index.less'
import { Device } from '@native/core/device/device'
import { Application } from '@native/core/application/application'
import { Home } from '@native/pages/home/home'

window.onload = function () {
	const device = new Device()
	const wx = new Application()
	const HomePage = new Home()

	device.open(wx)
	wx.initRootView(HomePage)
}
