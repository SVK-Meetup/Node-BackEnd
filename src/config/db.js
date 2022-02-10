const mongoose = require("mongoose")

mongoose.Promise = global.Promise;

mongoose.connect(
	process.env.DB_CONNSTRING,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
	},
	(err) => {
		if (err) {
			console.error("Error during MongoDB connection: " + err)
			return
		}
		console.log("Connected to DB.")
		require("./loadEvent")()
	}
)
