//utils
var Classes = require('./utils/cssClasses.js');

var DragDrop = require('./dd.js');

window.App = function (config) {
	this.config = config;
}

window.App.prototype.start = function () {
	this.classWorker = new Classes();
	this.dragDrop = new DragDrop();
}