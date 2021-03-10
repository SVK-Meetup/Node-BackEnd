const SVKEvent = require("../models/SVKEvent")
const setEvent = require("../util/setEvent")

module.exports = () => {
	SVKEvent.findOne({}, (err, event) => {
		if (err) {
			console.error("db.open:", err)
			return
		}

		if (event) {
			setEvent(event)
			console.log("db.open: Fetched event options from db.")
			return
		}

		new SVKEvent(process.config.EVENT).save((err, prod) => {
			if (err) {
				console.error("db.open.save: ", err)
				return
			}
			setEvent(prod)
			console.log("db.open.save: Event added to empty collection.")
		})
	})
}
