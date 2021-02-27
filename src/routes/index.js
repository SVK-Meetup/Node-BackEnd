const express = require("express")
const router = express.Router()
const path = require("path")
const Auth = require("../middleware/auth")

const objectRepository = {
	Attendee: require("../models/Attendee"),
	SVKEvent: require("../models/SVKEvent"),
	validateEmail: require("../util/validateEmail"),
	makeDateReadable: require("../util/makeDateReadable"),
	setEvent: require("../util/setEvent")
}
Object.freeze(objectRepository)

router.use(express.static(path.join(__dirname, "..", "..", "dist")))
router.get(["/", "/signin", "/admin", "/admin/page", "/admin/registered"], (req, res) => {
	res.sendFile(path.join(__dirname, "..", "..", "dist", "index.html"))
})

router.get("/api/event", require("../middleware/getEventConfig")(objectRepository))
router.post("/api/register", require("../middleware/register")(objectRepository))
router.use("/gallery", express.static(path.join(__dirname, "..", "..", "gallery")))

// A logout a többi /auth route előtt legyen
router.get("/auth/logout", Auth.logout)
router.get("/auth/:api", Auth.authorize)
router.get("/auth/:api/redirect", Auth.establish)

// Ez legyen a többi /api/admin/* előtt
router.all("/api/admin/*", Auth.verify)

router.delete("/api/admin/attendee", require("../middleware/deleteAttendee")(objectRepository))
router.get("/api/admin/attendees", require("../middleware/getAttendees")(objectRepository))
router.delete("/api/admin/attendees", require("../middleware/deleteAllAttendees")(objectRepository))
router.patch("/api/admin/event", require("../middleware/saveEvent")(objectRepository))

// 404
router.use(require("../middleware/pageNotFound")(objectRepository))

module.exports = router
