const fs = require('fs')
const path = require('path')

const dirs = fs.readdirSync('gallery')
const gallery = []
for(const dir of dirs) {
	const dirObject = {}
	// Read .metadata into dirObject
	const data = fs.readFileSync(path.join('gallery', dir, '.metadata')).toString()
	data.split('\n').forEach(line => {
		const record = line.split('=').map(value => value.trim())
		dirObject[record[0]] = record[1]
	})
	// Get individual image urls
	dirObject.images = fs.readdirSync(path.join('gallery', dir))
		.map(image => `/gallery/${dir}/${image}`)
	// Remove .metadata
	dirObject.images.splice(0,1)
	// Add path to index
	dirObject.index = `/gallery/${dir}/${dirObject.index}`
	// commit
	gallery.push(dirObject)
}
// Order by date in descending order
gallery.sort((f1, f2) => new Date(f1.date) < new Date(f2.date) ? 1 : -1)
process.config.GALLERY = gallery
