const walk = require('rohtr-walk')

function rohtr(o) {
	if(!o) 		throw 'Object expected'

	var roots = o.roots
	var _rewrite = o.rewrite

	if(typeof roots === 'string')
		roots = [roots]

	if(!roots) throw 'Object "roots" expected'

	roots
	.map(_root => walk({
		root: _root,
		rewrite: _rewrite
	}))
	.forEach(root => {

		console.log(root)

	})
}

module.exports = rohtr