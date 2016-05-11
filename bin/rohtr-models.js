function Folder() {
	this.parent  = {} // the parent model.Folder
	this.basename= '' // basename
	this.path    = '' // absolute path to this folder
	this.files   = [] // all files in folder
	this.folders = [] // sub-folders
	this.location= '' // url location
}

function Route() {
	this.basename= '' // basename
	this.path    = '' // absolute path to this folder
	this.location= '' // url location
	this.module  = {} // loaded module which produces locals
	this.template= (locals)=>'' // function which renders template
}

module.exports.Folder = Folder
module.exports.Route = Route