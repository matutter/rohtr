function Router(routes) {
	this.routes = routes
	this.defaultUrl = null
	this.defaultRoute = null
	return this
}

Router.prototype.setDefault = function(url) {
	this.defaultUrl = url
	this.defaultRoute = this.getRoute(this.defaultUrl)
	return this
}

Router.prototype.split = function(url) {
	if(url.length == 1) return ['/']
	var s = url.split('/')
	s[0] = '/'
	return s
}

Router.prototype.getRoute = function(url) {
	
	var parts = this.split(url)
	var next = this.routes
	var route

	do {
		route = next[parts.shift()]
		if(!route) return this.defaultRoute
		next = route.children
	} while (!route.isLeaf && parts.length > 0)

	return route
}

module.exports = Router