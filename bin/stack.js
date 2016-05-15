function Stack(zero_cb) {
	this.zero_cb = zero_cb
	this.stack = 0
}

Stack.prototype.push = function(first_argument) {
	this.stack++
}

Stack.prototype.pop = function(first_argument) {
	this.stack--
	if(!this.stack) {
		this.zero_cb()
	}
}

module.exports = Stack