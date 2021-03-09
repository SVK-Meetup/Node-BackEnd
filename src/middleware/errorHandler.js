const Sentry = require("@sentry/node");

module.exports = (err, req, res, next) => {
	if(!err.message)
		Sentry.captureException(err)
	return res.send({ message: err.message })
}
