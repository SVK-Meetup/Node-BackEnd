// const requireOption = require("../util/requireOption")
module.exports = objectRepository => {
	return (req, res, next) => {
		return res.send(global.config.EVENT)
	}
}
