const options = {
	roots : './tests/sample/',
	rewrite: {
		'/sample' : '/'
	}
}
const routes = require('../rohtr.js')(options)
const log = console.log

log(routes)

