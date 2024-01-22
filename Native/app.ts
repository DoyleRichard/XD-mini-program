import express from 'express'
import path from 'path'
const app = express()
const port = 6324

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/native', express.static(path.join(__dirname, 'dist')))
app.listen(port, () => {
	console.log(`port:${port} is running`)
})
