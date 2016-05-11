const options = {
	roots : './tests/sample/',
	rewrite: {
		'/sample' : '/'
	},
	template : { // object provided to template compiler
		pretty: true
	}
}



const routes = require('../rohtr.js')(options)
const log = console.log

routes.forEach( route => {

	if(route.module) {

		var locals = route.module.getLocals()
		var html = route.template(locals)

		console.log( html )

	}

})

