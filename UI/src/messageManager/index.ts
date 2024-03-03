import message from '@ui/message'

class MessageManager {
	message = message

	constructor() {}

	init() {
		this.message.receive('test_ui', (msg: any) => {
			console.log('ui messageManager: ', msg)
		})
	}
}

export default new MessageManager()
