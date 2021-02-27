require("./config")

const express = require("express")
const favicon = require("serve-favicon")
const compression = require("compression")
const logger = require("morgan")
const cookieParser = require("cookie-parser")
const path = require("path")
const app = express()

app.disable("x-powered-by")

app.use(favicon(path.join(__dirname, "..", "dist", "favicon.ico")))
app.use(compression())
app.use(logger(process.env.LOGGER))
app.use(cookieParser())
app.use(express.json())
app.use(require("./routes"))
app.use((err, req, res, next) => {
/* 	console.error(err) */
	return res.send({message: err.message, stack: err.stack})
})

app.listen(process.env.PORT, () =>
	console.log(
		"Server listening...",
		`${process.env.LOCATION}:${process.env.PORT}`
	)
)

module.exports = app
