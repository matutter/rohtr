// loads module and compiles template
var models = require('./rohtr-models.js')
var path = require('path')
var pug = require('pug')

function search(names, files, ext) {
	var result = undefined

	names.forEach(name => {
		for(var x = 0; x < files.length; ++x) {
			var file = files[x]
			var b = path.basename(file)
			if(b.startsWith(name) && b.endsWith(ext)) {
				result = file
				return
			}
		}
	})

	return result
}

// from a list of possible names select the first one which matches
function loadModule(names, files, o) {
	var name = search(names, files, '.js')
	var module = false
	if(name) {
		try {
			module = require(name)
			if(typeof module.getOptions !== 'function') throw 'Expected function "getOptions" in module '+name
		} catch(e) {console.log(e)}
	}

	if(!module) console.log('no module for', names[0])
	return module
}

function compileTemplate(names, files, o) {
	var name = search(names, files, '.pug')
	var template = false
	if(name)
		template = pug.compileFile(name, o)
	else
		console.log('no template for', names[0])
	return template
}

function load(folder, o) {
	if(typeof folder !== 'object')	throw 'Object expected'
	if(typeof o !== 'object') 		throw 'Object expected'

	var names       = [folder.basename, 'index'] // basename preferred over index
	var route       = new models.Route()
	route.basename  = folder.basename
	route.location  = folder.location
	route.path      = folder.path

	route.module = loadModule(names, folder.files, o)
	route.template = compileTemplate(names, folder.files, o.template)

	return route
}

module.exports = load