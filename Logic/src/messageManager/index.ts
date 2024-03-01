import message from '@native/message'

class MessageManager {
	message = message

	constructor() {}

	init() {
		this.message.receive('test', (msg: any) => {
			console.log('Logic messageManager: ', msg)
		})

		this.message.send('from Logic messageManager')
	}
}

export default new MessageManager()
