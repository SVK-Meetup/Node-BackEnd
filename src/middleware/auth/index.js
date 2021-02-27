const auth = require("./auth")({
	"node-fetch": require("node-fetch"),
	"jsonwebtoken": require("jsonwebtoken"),
	"apiDictionary": new Map()
})

module.exports = auth
