const walk = require('rohtr-walk')
const load = require('rohtr-loader')
const flatten = require('rohtr-flatten')

function rohtr(o) {
	if(!o) 			throw 'Object expected'
	if(!o.roots)	throw 'Object "roots" expected'

	var roots = o.roots
	var _rewrite = o.rewrite || {}
	var remove = o.remove || ['folders', 'parent', 'basename', 'files']
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