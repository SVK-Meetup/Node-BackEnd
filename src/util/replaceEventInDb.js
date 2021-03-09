const SVKEvent = require("../models/SVKEvent")
const setEvent = require("./setEvent")

module.exports = (event, cb) =>
	SVKEvent.replaceOne({}, event, err => {
		if (!err) setEvent(event)
		return cb(err, event)
	})
