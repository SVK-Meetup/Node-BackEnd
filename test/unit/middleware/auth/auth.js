const { expect } = require("chai")

describe("Auth.authorize", () => {
	const dictionary = new Map()
	dictionary.set("someapi", {
		authURL: "a",
		clientID: "b",
		scopes: [
			"c",
			"d"
		]
	})
	const mw = require("../../../../src/middleware/auth/auth")({
		"apiDictionary": dictionary,
		"jsonwebtoken": {},
		"node-fetch": {}
	}).authorize

	it("Should redirect to /signin because there is no such api", done => {
		mw({
			params: {
				api: "not-the-api-name-you-are-looking-for"
			}
		}, {
			redirect(url) {
				expect(url).to.equal("/signin")
				done()
			}
		})
	})

	it("Should redirect to api auth page", done => {
		mw({
			params: {
				api: "someapi"
			}
		}, {
			redirect(url) {
				expect(url).to.equal("a?response_type=code&client_id=b&scope=c d")
				done()
			}
		})
	})
})
