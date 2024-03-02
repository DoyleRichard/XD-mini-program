import message from '@logic/message'

class MessageManager {
	message = message

	constructor() {}

	init() {
		this.message.receive('test', (msg: any) => {
			console.log('Logic messageManager: ', msg)
		})

		setTimeout(() => {
			this.message.send({
				type: 'aaa',
				body: { aaa: 'from Logic messageManager' },
			})
		}, 1000)
	}
}

export default new MessageManager()
