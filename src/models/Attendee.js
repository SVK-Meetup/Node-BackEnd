const mongoose = require("mongoose");

const attendeeSchema = new mongoose.Schema({
	name: String,
	email: String,
	organization: String,
	comment: String
});

module.exports = mongoose.model("Attendee", attendeeSchema, "attendees");
