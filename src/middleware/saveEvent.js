const requireOption = require("../util/requireOption")
module.exports = objectRepository => {
	const replaceEventInDb = requireOption(objectRepository, "replaceEventInDb")

	return ({ body }, res, next) =>
		replaceEventInDb(body, (err, event) => {
			if (err) return next(err)
			return res.send({ message: "Elmentve" })
		})
}
