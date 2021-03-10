const requireOption = require("../util/requireOption")
module.exports = objectRepository => {
	const Attendee = requireOption(objectRepository, "Attendee")

	return (req, res, next) => {
		Attendee
			.find({})
			.sort("name")
			.exec((err, attendees) => {
				if (err || !attendees) return next(err)
				return res.send(attendees)
			})
	}
}
