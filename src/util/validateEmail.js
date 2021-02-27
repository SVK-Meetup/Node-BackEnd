module.exports = email =>
	typeof email === "string" &&
	email.length < 61 &&
	email.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)