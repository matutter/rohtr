const PATH = require('path')
const UTIL = require('util')
const PUG = require('pug')
const FS = require('fs')
const Q = require('q')

const models = require('./bin/models.js')
const Stack = require('./bin/stack.js')
const Router = require('./bin/router.js')

/**
 * Expects rohtr-models.RohtrOptions
 */
function rohtr(o) {
	this.defer = Q.defer()
	this.routes = {}
	o.root = o.root || './routes'
	this.rewrite  = o.rewrite || {}
	this.template = o.template || {}
	this.defaultUrl = o.defaultUrl
	this.stack = new Stack(this.end.bind(this))

	this.walk(o.root, false, this.routes)

	return this.defer.promise
}

function extendObject(source, dest) {
	Object.keys(source).forEach(key => {
		if(!dest.hasOwnProperty(key))
			dest[key] = source[key]
	})
}

rohtr.prototype.walk = function(path, parent, mapto) {

	var basename = PATH.basename(path)
	var name = this.rewrite[basename] || basename
	var module = false
	var children = []
	var route = new models.Route()
	var scope = new Stack(()=>{
		//set this if not defined
		var r = route

		if(module) {
			extendObject(models.Route.prototype, module)
			extendObject(route, module)
			r = module
		}

		children.forEach(file => this.walk(file, r, r.children))

		if(!r.isLeaf)
			r.isLeaf = !r.hasChildren()
		
		mapto[name] = r
	})

	route.parent = parent || false
	route.name = name
	route.dir = PATH.resolve(path)
	route.location = parent ? parent.location +'/'+route.name : route.name
	route.location = route.location.replace(/\/+/, '/')

	if(mapto.hasOwnProperty(name))
		return this.defer.reject('Duplicate route "'+name+'" in', path)

	mapto[name] = route

	this.readdir(path, files => {
		
		files.forEach( file => {
			scope.push()
			file = PATH.resolve(route.dir, file)
			this.stat(file, stats => {

				if(stats.isDirectory())
					children.push(file)
				else if(this.isTemplate(file, route))
					this.compileTemplate(file, route)
				else if(this.isModule(file, route))
					module = this.loadModule(file, route)

				scope.pop()
			})
		})
	})
}

function isFile(file, route, ext) {
	if(!file.endsWith(ext)) return
	var f = (n) => file.startsWith(n)
	var original = PATH.dirname(file)
	return f(route.name) || f(original) || f('index')
}

rohtr.prototype.isTemplate = function(file, route) {
	return isFile(file, route, '.pug')
}

rohtr.prototype.isModule = function(file, route) {
	return isFile(file, route, '.js')
}

rohtr.prototype.compileTemplate = function(file, route) {
	route.render = PUG.compileFile(file, this.template)
}

rohtr.prototype.loadModule = function(file, route) {
	var instance = false
	try {
		var module = require(file)
		instance = new module()
		console.log('Module',route.name,'Exports', UTIL.inspect(module.prototype))
	} catch(e) {
		instance = false
		this.defer.reject(e)
	}

	return instance
}

rohtr.prototype.readdir = function(path, cb) {
	this.stack.push()
	FS.readdir(path, (e, files) => {
		if(e) return this.defer.reject(e)
		cb(files)
		this.stack.pop()
	})
}

rohtr.prototype.stat = function(path, cb) {
	this.stack.push()
	FS.stat(path, (e, stats) => {
		if(e) return this.defer.reject(e)
		cb(stats)
		this.stack.pop()
	})
}

rohtr.prototype.end = function(n) {
	var router = new Router(this.routes)
		
	this.defer.resolve(router.setDefault(this.defaultUrl))
}

module.exports = (options) => new rohtr(options)