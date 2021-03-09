const makeDateReadable = require("./makeDateReadable")

module.exports = newValue => {
	process.config.EVENT = JSON.parse(JSON.stringify(newValue))
	process.config.EVENT.gallery = process.config.GALLERY
	process.config.EVENT.date = new Date(process.config.EVENT.date)
	process.config.EVENT.humanDate = makeDateReadable(process.config.EVENT.date)
}
