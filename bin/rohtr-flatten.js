// flatten a tree-structured object
// object is there for extending only
function flatten(tree, o) {
	if(!tree || !o) 			throw 'Object expected'
	if(!Array.isArray(tree)) 	throw 'Object "tree" expected Array'

	var flat 	= {}
	var stack	= []
	var push	= (ary) => ary.forEach(n=>stack.push(n))
	var exists	= (loc) => flat.hasOwnProperty(loc)

	push(tree)

	var node	= stack.pop()
	var loc 	= null

	while(node) {
		loc = node.location

		if(!loc)		throw 'Object missing "location" property'
		if(exists(loc))	throw 'Duplicate location "'+loc+'"'

		flat[loc] = node
		push(node.folders)
		node = stack.pop()
	}

	return Object.keys(flat).map(location => flat[location])
}

module.exports = flatten