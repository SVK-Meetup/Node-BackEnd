const mongoose = require("mongoose");

const attendeeSchema = new mongoose.Schema({
	name: String,
	email: String,
	organization: String,
	comment: String,
	emailConsent: Boolean,
});

module.exports = mongoose.model("Attendee", attendeeSchema, "attendees");
