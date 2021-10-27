const makeDateReadable = require("./makeDateReadable")

module.exports = newValue => {
	global.config.EVENT = JSON.parse(JSON.stringify(newValue))
	global.config.EVENT.gallery = global.config.GALLERY
	global.config.EVENT.date = new Date(global.config.EVENT.date)
	global.config.EVENT.humanDate = makeDateReadable(global.config.EVENT.date)
}
