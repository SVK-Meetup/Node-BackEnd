const mongoose = require("mongoose");

module.exports = mongoose.model("event", {
	title: String,
	bannerURL: String,
	shortdesc: String,
	longdesc: String,
	date: Date,
	humanDate: String,
	regActive: Boolean,
	presenters: [{
		name: String,
		picture: String,
		description: String
	}],
	contacts: [{
		name: String,
		picture: String,
		tel: String,
		email: String
	}],
	partners: [{
		name: String,
		logo: String,
		website: String
	}],
	theme: Object
}, "event");
