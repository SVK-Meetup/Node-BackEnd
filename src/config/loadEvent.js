const SVKEvent = require("../models/SVKEvent")
const setEvent = require("../util/setEvent")

module.exports = () => {
	SVKEvent.findOne({}, (err, event) => {
		if (err) {
			return console.error("db.open:", err)
		}

		if (event) {
			setEvent(event)
			return console.log("db.open: Fetched event options from db.")
		}

		SVKEvent.create(global.config.EVENT, (err, prod) => {
			if (err) {
				return console.error("db.open.save: ", err)
			}
			setEvent(prod)
			console.log("db.open.save: Event added to empty collection.")
		})
	})
}
