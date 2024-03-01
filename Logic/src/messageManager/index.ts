import message from '@native/message'

class MessageManager {
	message = message

	constructor() {}

	init() {
		this.message.receive('test', (msg: any) => {
			console.log('messageManager: ', msg)
		})
	}
}

export default new MessageManager()
