const DummyFunction = (e) => {console.log(e)}

function RohtrOptions() {
	this.routes = [] // array relative or absolute of paths
	this.template = {} // object passed to pug.compileFile
	this.rewrite = {} // keyvalue pairs to rewirte url-locations
}

function Route() {
	this.parent = {} // parent route
	this.children = {} // child routes
	this.name = '' // qname in url-location
	this.dir = '' // absolute fs path
	this.location = '' // full url-location
	this.render = null // called to render a page
	this.isLeaf = false // if true, this route will be rendered and subsequnt qnames appear as a QS
}

Route.prototype.hasChildren = function() {
	return Object.keys(this.children).length > 0
}

// iterates over all children
Route.prototype.forEach = function(cb, depth) {
	depth--
	Object.keys(this.children).forEach(key => {
		var child = this.children[key]
		cb(child)
		if(depth)
			child.forEach(cb)
	})
}

module.exports.Route = Route