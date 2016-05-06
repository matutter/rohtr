const walk = require('rohtr-walk')

function rohtr(options) {
	options = options || {}
	this.roots = options.roots;

	if(typeof this.roots === 'string')
		this.roots = [this.roots]

	if(!this.roots) throw 'Object "roots" expected'

	this.roots.map(_root => walk({root:_root}))

	this.roots.forEach(root => {

		console.log('x', root)

	})
}



module.exports = rohtr;