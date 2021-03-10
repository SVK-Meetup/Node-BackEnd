const Attendee = require("../../src/models/Attendee")
const { makeJWT } = require("../../src/middleware/auth")

const routes = require("../../src/routes")


//#region test routes
/*
 * While using these, comment the 404 fallback route in "routes"
 */

routes.get("/admin/user/email", ({ body: { email } }, res) => {
	Attendee.findOne({ email }, (err, attendee) => {
		res.send(attendee)
	})
})

routes.get("/jwt", (req, res) => {
	res.cookie("SVK-JWT", makeJWT(), {
		maxAge: process.config.JWT_TTL,
		httpOnly: true
	})
	res.cookie("SVK-STATUS", 1, {
		maxAge: process.config.JWT_TTL
	})

	return res.sendStatus(200)
})

//#endregion

const app = require("../../src/app")

module.exports = app
