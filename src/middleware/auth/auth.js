/*
 ? Verifies from a 3rd party OAuth API weather the user is permitted to do an action then signes a JWT for them.
 * needs process.config.JWT_TTL JWT time of validity
 * needs process.config.JWT_MAX_TTL JWT maximum time of validity
 * needs process.env.JWT_SECRET JWT secret needed to sign and verify the JWTs
 */

const requireOption = require("../../util/requireOption")
module.exports = objectRepository => {
	/**
	 * @type {Map<string, API>}
	 */
	const apiDictionary = requireOption(objectRepository, "apiDictionary")
	const jwt = requireOption(objectRepository, "jsonwebtoken")
	const fetch = requireOption(objectRepository, "node-fetch")

	/**
	 * @description Makes a JWT with the .env given expiry times
	 * @returns {string} A JWT string
	 */
	const makeJWT = (prev = {}) => jwt.sign({
		exp: Date.now() + process.config.JWT_TTL,
		maxLife: prev.maxLife ?? Date.now() + process.config.JWT_MAX_TTL
	}, process.env.JWT_SECRET)

	return {
		/**
		 * @description Makes a JWT with the .env given expiry times
		 * @returns {string} A JWT string
		 */
		makeJWT,

		/**
		 * @class API
		 * @description contains OAuth API specific information
		 * @param {string} authURL
		 * @param {string} tokenURL
		 * @param {string} apiURL
		 * @param {string} clientID
		 * @param {string} clientSecret
		 * @param {Array<string>} scopes
		 * @param {Function} extractor
		 */
		API: class API {
			constructor(authURL, tokenURL, apiURL, clientID, clientSecret, scopes, extractor) {
				this.authURL = authURL
				this.tokenURL = tokenURL
				this.apiURL = apiURL
				this.clientID = clientID
				this.clientSecret = clientSecret
				this.scopes = scopes
				this.extractor = extractor
			}
		},

		/**
		 * @description Adds a API to the list of apiDictionary
		 * @param {string} name
		 * @param {API} api
		 */
		use: (name, api) => {
			Object.freeze(api)
			apiDictionary.set(name, api)
		},

		/**
		 * @description Redirects the user to the authURL of the given API
		 * @param {Request} req
		 * @param {Response} res
		 */
		authorize: (req, res) => {
			const api = apiDictionary.get(req.params.api)
			if (!api)
				return res.redirect("/signin")
			res.redirect(`${api.authURL}?response_type=code&client_id=${api.clientID}&scope=${api.scopes.join(' ')}`)
		},

		/**
		 * @description Makes a JWT or throws an error based on the response
		 * @param {Request} req
		 * @param {Response} res
		 */
		establish: (req, res, next) => {
			const api = apiDictionary.get(req.params.api)
			const fetchErrorHandler = err => next(err)
			if (!api) return res.redirect("/signin")
			const clientIDAndSecret = Buffer.from(`${api.clientID}:${api.clientSecret}`).toString("base64")
			fetch(api.tokenURL, {
				method: "POST",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
					"Authorization": `Basic ${clientIDAndSecret}`
				},
				body: `grant_type=authorization_code&code=${req.query.code}`
			})
				.then(res => res.json())
				.then(({ access_token }) => {
					if (!access_token) return res.redirect("/signin")
					fetch(`${api.apiURL}?access_token=${access_token}`)
						.then(res => res.json())
						.then(api.extractor)
						.then(isAllowed => {
							if (!isAllowed)
								throw new Error("Nem vagy az engedélyezett körök tagja")

							res.cookie("SVK-JWT", makeJWT(), {
								maxAge: process.config.JWT_TTL,
								httpOnly: true,
								sameSite: "Strict"
							})
							res.cookie("SVK-STATUS", 1, {
								maxAge: process.config.JWT_TTL
							})

							return res.redirect("/admin/page")
						})
						.catch(fetchErrorHandler)
				})
				.catch(fetchErrorHandler)
		},

		/**
		 * @description "Deletes" the JWT cookie then redirects to /signin
		 * @param {Request} req
		 * @param {Response} res
		 */
		logout: (req, res) => {
			res.cookie("SVK-JWT", "", {
				maxAge: 0,
				httpOnly: true,
				sameSite: "Strict"
			})
			res.cookie("SVK-STATUS", "", {
				maxAge: 0
			})
			return res.sendStatus(200)
		},

		/**
		 * @description Validates JWT in the SWK-JWT cookie then sets a fresh one
		 * @param {Request} req
		 * @param {Response} res
		 * @param {NextFunction} next
		 */
		verify: (req, res, next) => {
			jwt.verify(
				req.cookies["SVK-JWT"],
				process.env.JWT_SECRET,
				(err, tokenPayload) => {
					if (err ||
						tokenPayload?.exp < Date.now() ||
						tokenPayload?.maxLife < Date.now()) {
						return res.status(403).send({ message: "Jelentkezz be újra!" })
					}

					res.cookie("SVK-JWT", makeJWT(tokenPayload), {
						maxAge: process.config.JWT_TTL,
						httpOnly: true,
						sameSite: "Strict"
					})
					res.cookie("SVK-STATUS", 1, {
						maxAge: process.config.JWT_TTL
					})

					return next()
				}
			)
		}
	}
}
