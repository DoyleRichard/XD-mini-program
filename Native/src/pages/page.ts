import { Application } from '@native/core/application/application'

export class PageInstance {
	id: string
	rootElement: HTMLDivElement
	parent: Application
	onPresentIn() {}
	onPresentOut() {}
}
