const express = require("express")
const router = express.Router()
const path = require("path")
const Auth = require("../middleware/auth")

const objectRepository = {
	Attendee: require("../models/Attendee"),
	SVKEvent: require("../models/SVKEvent"),
	validateEmail: require("../util/validateEmail"),
	replaceEventInDb: require("../util/replaceEventInDb")
}
Object.freeze(objectRepository)

const getEventConfigMW = require("../middleware/getEventConfig")(objectRepository)
const registerMW = require("../middleware/register")(objectRepository)
const getAttendeesMW = require("../middleware/getAttendees")(objectRepository)
const deleteAttendeeMW = require("../middleware/deleteAttendee")(objectRepository)
const deleteAllAttendeesMW = require("../middleware/deleteAllAttendees")(objectRepository)
const saveEventMW = require("../middleware/saveEvent")(objectRepository)
const resetEventMW = require("../middleware/resetEvent")(objectRepository)
const pageNotFoundMW = require("../middleware/pageNotFound")(objectRepository)

router.use(express.static(path.join(__dirname, "..", "..", "dist")))
router.get(["/", "/signin", "/admin", "/admin/page", "/admin/registered"], (req, res) => {
	res.sendFile(path.join(__dirname, "..", "..", "dist", "index.html"))
})

router.get("/api/event", getEventConfigMW)
router.post("/api/register", registerMW)
router.use("/gallery", express.static(path.join(__dirname, "..", "..", "gallery")))

// A logout a többi /auth route előtt legyen különben API-nak nézi
router.get("/auth/logout", Auth.logout)
router.get("/auth/:api", Auth.authorize)
router.get("/auth/:api/redirect", Auth.establish)

// Ez legyen a többi /api/admin/* előtt
router.all("/api/admin/*", Auth.verify)

router.delete("/api/admin/attendee", deleteAttendeeMW)
router.get("/api/admin/attendees", getAttendeesMW)
router.delete("/api/admin/attendees", deleteAllAttendeesMW)
router.patch("/api/admin/event", saveEventMW)
router.delete("/api/admin/event", resetEventMW)

// 404
router.use(pageNotFoundMW)

module.exports = router
