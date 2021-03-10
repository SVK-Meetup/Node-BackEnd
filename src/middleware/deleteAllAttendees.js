const requireOption = require("../util/requireOption")
module.exports = objectRepository => {
	const Attendee = requireOption(objectRepository, "Attendee")

	return (req, res, next) => {
		Attendee.deleteMany({}, err => {
			if (err) return next(err)
			return res.send({ message: "Purgálva." })
		})
	}
}
