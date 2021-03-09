require("./config")

const path = require("path")
const express = require("express")
const app = express()
const Sentry = require("@sentry/node")
Sentry.init({
	dsn: process.env.SENTRY_DSN
})

app.disable("x-powered-by")


app.use(require("serve-favicon")(path.join(__dirname, "..", "dist", "favicon.ico")))
// Logging
if (process.env.NODE_ENV !== "production") {
	app.use(require("morgan")(process.env.LOGGER))
}
app.use(require("compression")())
app.use(require("cookie-parser")())
app.use(express.json())
app.use(require("./routes"))
app.use(require("./middleware/errorHandler"))



app.listen(process.env.PORT, () =>
	console.log(
		"Server listening...",
		`${process.env.LOCATION}:${process.env.PORT}`
	)
)

module.exports = app
