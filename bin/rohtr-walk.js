const fs = require('fs')
const path = require('path')
const models = require('./rohtr-models.js')

function appendLocation(parent, basename) {
	var parentLocation = parent ? parent.location : ''
	return parentLocation + '/' + basename
}

function walk(o) {
	if(!o) 			throw 'Object expected'
	if(!o.root) 	throw 'Object "root" expected'

	var root 		= o.root;
	var parent 		= o.parent || false
	var _rewrite	= o.rewrite

	var folder 		= new models.Folder()
	var _path 		= path.resolve(root)
	var basename 	= path.basename(_path)
	var list 		= fs.readdirSync(root).map(f=>path.resolve(root,f))
	var location	= appendLocation(parent, basename)
	var files 		= []
	var folders 	= []

	if(_rewrite.hasOwnProperty(location))
		location = _rewrite[location]

	list.map(fs.statSync).forEach((stat, index) => {
		var file = list[index]
		var isFile = !stat.isDirectory()

		if(isFile) files.push(file)
			else folders.push(file)
	})

	folder.parent  = parent
	folder.basename= basename
	folder.path    = _path
	folder.files   = files
	folder.location= location.replace(/\/{2,}/, '/')
	folder.folders = folders.map(f => walk({
		root: f,
		parent: folder,
		rewrite: _rewrite
	}))

	return folder;	
}

module.exports = walk