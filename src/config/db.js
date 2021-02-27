const mongoose = require("mongoose")

mongoose.connect(process.env.DB_CONNSTRING, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false
}).catch(console.error)
mongoose.connection.on("error", console.error.bind(console, "connection error:"))
mongoose.connection.once("open", require("./loadEvent"))
