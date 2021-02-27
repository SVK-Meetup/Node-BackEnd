function monthToString(m) {
	switch(m) {
		case 0: return "Január"
		case 1: return "Február"
		case 2: return "Március"
		case 3: return "Április"
		case 4: return "Május"
		case 5: return "Június"
		case 6: return "Július"
		case 7: return "Augusztus"
		case 8: return "Szeptember"
		case 9: return "Október"
		case 10: return "November"
		case 11: return "December"
	}
}

function fill0(t) {
	if(t < 10) {
		return "0" + t
	}
	return t
}

/**
 * @description makes a human friendly date string
 * @param {Date} date
 * @returns {string} YYYY. Month DD. HH:MM
 */
module.exports = date => {
	return date.getFullYear() + ". " +
		monthToString(date.getMonth()) + " " +
		date.getDate() + ". " +
		fill0(date.getHours()) + ":" + fill0(date.getMinutes())
}
