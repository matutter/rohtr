
function SamplePage() {
	this.title = 'Site Root'

}


SamplePage.prototype.getLocals = function(req) {
	var options = {
		title: this.title
	}
	return options
}

module.exports = SamplePage