const requireOption = require("../util/requireOption")
module.exports = objectRepository => {
	const replaceEventInDb = requireOption(objectRepository, "replaceEventInDb")

	return (req, res, next) =>
		replaceEventInDb(require("../config/default-event-options"), (err, event) => {
			if (err) return next(err)
			return res.send({ message: "Meg Rezsőzve" })
		})
}
