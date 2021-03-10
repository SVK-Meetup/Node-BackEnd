/*
* setup ENVs and CONFIGs
*/
require("dotenv").config()
process.config.ALLOWED_IDS = process.env.ALLOWED_IDS.split(',').map(s => parseInt(s))
process.config.JWT_TTL = parseInt(process.env.JWT_TTL)
process.config.JWT_MAX_TTL = parseInt(process.env.JWT_MAX_TTL)
process.config.EVENT = require("./default-event-options")
require("./gallery") // should be before the DB config


/*
* setup Authorization
*/
const Auth = require("../middleware/auth")

Auth.use("authsch", new Auth.API(
	process.env.AUTHSCH_AUTH_URL,
	process.env.AUTHSCH_TOKEN_URL,
	process.env.AUTHSCH_API_URL,
	process.env.AUTHSCH_CLIENT_ID,
	process.env.AUTHSCH_SECRET,
	["eduPersonEntitlement"],
	({ eduPersonEntitlement }) =>
		eduPersonEntitlement?.some(el => process.config.ALLOWED_IDS.includes(el.id))
))


/*
* Setup DBs
*/
require("./db")
