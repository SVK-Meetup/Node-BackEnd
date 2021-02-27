const requireOption = require("../util/requireOption")
module.exports = objectRepository => {
	const Attendee = requireOption(objectRepository, "Attendee")

	return (req, res, next) => {
		Attendee.findById(req.body._id, (err, attendee) => {
			if(err)
				return next(err)
			if(!attendee)
				return next(new Error("Nincs ilyen résztvevő."))
			attendee.remove(err => {
				if(err) return next(err)
				return res.send({ message: `${attendee.name} - Törölve` })
			})
		})
	}
}

