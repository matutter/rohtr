const walk = require('./bin/rohtr-walk.js')
const load = require('./bin/rohtr-loader.js')
const flatten = require('./bin/rohtr-flatten.js')

function rohtr(o) {
	if(!o) 			throw 'Object expected'
	if(!o.roots)	throw 'Object "roots" expected'

	var roots = o.roots
	var _rewrite = o.rewrite || {}
	var _template = o.template || {}

	if(typeof roots === 'string')
		roots = Array.of(roots)

	roots = roots.map(_root => walk({
		root: _root,
		rewrite: _rewrite
	}))

	return flatten(roots, {}).map(r=>load(r, {template:_template}))
}

module.exports = rohtr