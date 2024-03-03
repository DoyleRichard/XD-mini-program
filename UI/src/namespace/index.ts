interface Window {
	JSBridge: {
		onReceiveNativeMessage?: (arg1: any) => any
	}
}
window.JSBridge = {}
