rohtr
=================

A classic router for nodejs built around pug.compileTemplate. Page defined modules can be use by naming the script the same as the folder, or index.js/.pug.


```javascript
//from ./test

var options = {
	root : './tests/sample/',       // this is the path to the site root, by default this is './routes'
	rewrite: {		                // simple rewrite rules, if the folder is named 'sample' it's url will not be '/'
		'sample' : '/'
	},
	defaultUrl:  '/',               // When no route can be found this one is used instead
	template : {                    // options passed to pug.compileFile
		pretty: true
	}
}

require('rohtr')(options)
.then(router => {
	route = router.getRoute('/')
})
.catch(error => {
	console.log(error.stack)
})

```