import express from 'express'
import cors from 'cors'
import path from 'path'
const app = express()
const port = 6326

app.use(cors())
app.use('/ui_sdk', express.static(path.join(__dirname, 'dist')))

app.listen(port, () => {
	console.log(`port:${port} is running`)
})
