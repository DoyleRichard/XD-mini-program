import axios from 'axios'

export function sleep(time: number) {
	return new Promise<void>(resolve => {
		setTimeout(() => {
			resolve()
		}, time)
	})
}

/**
 * 逐步往元素的父元素找拥有目标 className 的元素
 * @param node 元素
 * @param className 类名
 * @returns
 */
export function closest(node: Element, className: string) {
	let current = node

	while (current && current.classList && !current.classList.contains(className)) {
		current = current.parentElement
	}

	return current
}

export function queryPath(path: string) {
	const paramStr = path.split('?')[1]
	const pagePath = path.split('?')[0]
	const result = {
		query: <Record<string, any>>{},
		pagePath,
	}

	if (!paramStr) {
		return result
	}

	let paramList = paramStr.split('&')

	paramList.forEach(param => {
		let key = param.split('=')[0]
		let value = param.split('=')[1]

		result.query[key] = value
	})

	return result
}

export function readFile(filePath: string): Promise<any> {
	return new Promise((resolve, reject) => {
		axios.get('/mini_resource/' + filePath, { responseType: 'text' }).then(res => {
			resolve(res.data)
		})
	})
}

export function mergePageConfig(appConfig: Record<string, any>, pageConfig: Record<string, any>): Record<string, any> {
	const result: any = {}
	const appWindowConfig = appConfig.window || {}
	const pagePrivateConfig = pageConfig || {}

	result.navigationBarTitleText =
		pagePrivateConfig.navigationBarTitleText || appWindowConfig.navigationBarTitleText || ''
	result.navigationBarBackgroundColor =
		pagePrivateConfig.navigationBarBackgroundColor || appWindowConfig.navigationBarBackgroundColor || '#000'
	result.navigationBarTextStyle =
		pagePrivateConfig.navigationBarTextStyle || appWindowConfig.navigationBarTextStyle || 'white'
	result.backgroundColor = pagePrivateConfig.backgroundColor || appWindowConfig.backgroundColor || '#fff'
	result.navigationStyle = pagePrivateConfig.navigationStyle || appWindowConfig.navigationStyle || 'default'

	return result
}
