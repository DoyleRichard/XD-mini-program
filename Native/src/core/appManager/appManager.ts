import { queryPath } from '@native/utils/util'
import { getMiniAppInfo } from '@native/services'
import { miniAppSanbox } from '../miniAppSanbox/miniAppSanbox'
import { Application } from '../application/application'

export class AppManager {
	static appStack: miniAppSanbox[] = []

	static async openApp(opts: { appId: string; path: string; scene: number }, wx: Application) {
		const { appId, path, scene } = opts
		const { pagePath, query } = queryPath(path)
		const { appName, logo } = await getMiniAppInfo(appId)
		const miniApp = new miniAppSanbox({
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

	static closeApp(miniApp: any) {}
}
