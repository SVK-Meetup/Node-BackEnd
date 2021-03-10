const requireOption = require("../util/requireOption")
module.exports = objectRepository => {
	const Attendee = requireOption(objectRepository, "Attendee")
	const validateEmail = requireOption(objectRepository, "validateEmail")

	return ({ body: { name, email, organization, comment } }, res, next) => {
		if (!process.config.EVENT.regActive) {
			res.status(403)
			return next(new Error("Nincs regisztrációs időszak."))
		}

		if (!(
			validateEmail(email) &&
			typeof name == "string" && name.length < 61 &&
			typeof organization == "string" && organization.length < 61 &&
			typeof comment == "string" && comment.length < 101
		)) {
			res.status(406)
			return next(new Error("A bevitt értékek nem megfelelőek."))
		}

		new Attendee({ name, email, organization, comment })
			.save(err => {
				if (err) {
					res.status(409)
					return next(new Error("Ezzel az e-mail címmel már regisztráltak."))
				}
				return res.send({ message: "Sikeres regisztráció." })
			})
	}
}
