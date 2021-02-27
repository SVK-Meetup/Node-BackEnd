/**
 * @description Load a dependency from an object repository
 * @param objectRepository object repository
 * @param propertyName dependency name
 * @returns {any} The required dependency
 */
module.exports = (objectRepository, propertyName) => {
	if (propertyName in objectRepository) {
		return objectRepository[propertyName]
	}
	throw new TypeError(`${propertyName} required`)
}
