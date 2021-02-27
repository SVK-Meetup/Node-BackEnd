const requireOption = require("../util/requireOption")
module.exports = objectRepository => {
	const SVKEvent = requireOption(objectRepository, "SVKEvent")
	const makeDateReadable = requireOption(objectRepository, "makeDateReadable")
	const setEvent = requireOption(objectRepository, "setEvent")

	return ({body}, res, next) => {
		body.date = new Date(body.date)
		body.humanDate = makeDateReadable(body.date)
		SVKEvent.replaceOne({}, body, err => {
			if(err) return next(err)
			setEvent(body)
			return res.send({message: "Elmentve"})
		})
	}
}
