const requireOption = require("../util/requireOption")
module.exports = objectRepository => {
	return (req, res) => {
		return res.status(404).send("Not found...")
	}
}
