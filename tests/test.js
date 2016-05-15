const options = {
	root : './tests/sample/',
	rewrite: {
		'sample' : '/'
	},
	defaultUrl:  '/',
	template : {
		pretty: true
	}
}



const promise = require('../rohtr.js')(options)
const log = console.log

function test(router, url) {
	console.log(url, '=', router.getRoute(url).name)
}

function onReady(router) {

	//walk(router.routes)

	try {
		test(router, '/')
		test(router, '/subfolder')
		test(router, '/subfolderx')
	} catch(e) {
		console.log(e.stack)
	}


}

function walk(routes) {

	Object.keys(routes).forEach(name => {

		var route = routes[name]
		console.log(route)

		if(route.render) {
			console.log(route.render(route.getLocals()))
		}

	})
}

promise
.then(onReady)
.catch(e => {
	
	console.log(e)

})

