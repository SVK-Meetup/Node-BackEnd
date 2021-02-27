module.exports = newValue => {
	process.config.EVENT = JSON.parse(JSON.stringify(newValue))
	process.config.EVENT.gallery = process.config.GALLERY
}
