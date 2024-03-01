import { queryPath } from '@native/utils/util'
import { getMiniAppInfo } from '@native/services'
import { miniAppSandbox } from '../miniAppSandbox/miniAppSandbox'
import { Application } from '../application/application'

export class AppManager {
	static appStack: miniAppSandbox[] = []

	static async openApp(opts: { appId: string; path: string; scene: number }, wx: Application) {
		const { appId, path, scene } = opts
		const { pagePath, query } = queryPath(path)
		const { appName, logo } = await getMiniAppInfo(appId)
		const miniApp = new miniAppSandbox({
			appId,
			scene,
			appName,
			logo,
			pagePath,
			query,
		})

		this.appStack.push(miniApp)
		wx.presentView(miniApp)
	}

	static closeApp(miniApp: miniAppSandbox) {
		miniApp.parent.dismissView()
	}
}
