import express from 'express'
import path from 'path'
import cors from 'cors'
const app = express()
const port = 6325

app.use(cors())
app.use('/logic', express.static(path.join(__dirname, 'dist')))
app.listen(port, () => {
	console.log(`port:${port} is running`)
})
