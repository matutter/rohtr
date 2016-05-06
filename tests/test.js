const options = {
	roots : './tests/sample/',
	rewrite: {
		'sample' : '/'
	}
}
const rohtr = require('../index.js')(options)
const log = console.log


