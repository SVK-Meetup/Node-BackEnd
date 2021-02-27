const { expect } = require("chai")

describe("Register middleware", () => {

	it("Should call next with Error \"Nincs regisztrációs időszak.\" and set status to 403.", done => {
		process.config.EVENT.regActive = false
		const mw = require("../../../src/middleware/register")({
			validateEmail: e => false,
			Attendee: class {
				save(cb) {
					cb()
				}
			}
		})

		mw({
			body:{}
		}, {
			status(code) {
				expect(code).to.equal(403)
			}
		}, err => {
			expect(err).to.be.instanceOf(Error)
			expect(err.message).to.equal("Nincs regisztrációs időszak.")
			done()
		})
	})

	it("Should call next with Error \"A bevitt értékek nem megfelelőek.\" and set status to 406.", done => {
		process.config.EVENT.regActive = true
		const mw = require("../../../src/middleware/register")({
			validateEmail: e => true,
			Attendee: class {
				save(cb) {
					cb()
				}
			}
		})

		mw({
			body:{}
		}, {
			status(code) {
				expect(code).to.equal(406)
			}
		}, err => {
			expect(err).to.be.instanceOf(Error)
			expect(err.message).to.equal("A bevitt értékek nem megfelelőek.")
			done()
		})
	})
	// itt még lehetne ellaborálni a validáción

	it("Should call save on new Attendee then get duplicate error.", done => {
		process.config.EVENT.regActive = true
		const mw = require("../../../src/middleware/register")({
			validateEmail: e => true,
			Attendee: class {
				save(cb) {
					cb(new Error())
				}
			}
		})

		mw({
			body:{
				name: "validName",
				organization: "validOrganization",
				comment: "validComment"
			}
		}, {
			status(code) {
				expect(code).to.equal(409)
			}
		}, err => {
			expect(err).to.be.instanceOf(Error)
			expect(err.message).to.equal("Ezzel az e-mail címmel már regisztráltak.")
			done()
		})
	})

	it("Should call save on new Attendee.", done => {
		process.config.EVENT.regActive = true
		const mw = require("../../../src/middleware/register")({
			validateEmail: e => true,
			Attendee: class {
				save(cb) {
					cb()
				}
			}
		})

		mw({
			body:{
				name: "validName",
				organization: "validOrganization",
				comment: "validComment"
			}
		}, {
			send(toSend) {
				expect(toSend?.message).to.equal("Sikeres regisztráció.")
				done()
			}
		})
	})
})
