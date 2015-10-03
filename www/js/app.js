(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
//utils
'use strict';

var Classes = require('./utils/cssClasses.js');

var DragDrop = require('./dd.js');

window.App = function (config) {
	this.config = config;
};

window.App.prototype.start = function () {
	this.classWorker = new Classes();
	this.dragDrop = new DragDrop();
};

},{"./dd.js":2,"./utils/cssClasses.js":3}],2:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var DragDropClass = (function () {
    function DragDropClass() {
        _classCallCheck(this, DragDropClass);

        this.initEvents();
    }

    _createClass(DragDropClass, [{
        key: 'initEvents',
        value: function initEvents() {
            var dragged;

            document.addEventListener('drag', function (event) {}, false);

            //drag start
            document.addEventListener('dragstart', function (event) {
                dragged = event.target;
                window.app.classWorker.addClass(event.target, 'dragged');
                window.app.classWorker.addClass(document.body, 'dragg-active');
            }, false);

            //drag end
            document.addEventListener('dragend', function (event) {
                window.app.classWorker.removeClass(event.target, 'dragged');
                window.app.classWorker.removeClass(document.body, 'dragg-active');
            }, false);

            //drag over
            document.addEventListener('dragover', function (event) {
                event.preventDefault();
            }, false);

            //drag enter
            document.addEventListener('dragenter', function (event) {
                if (window.app.classWorker.hasClass(event.target, 'dropzone')) {
                    window.app.classWorker.addClass(event.target, 'drag-enter');
                }
            }, false);

            //drag leave
            document.addEventListener('dragleave', function (event) {
                if (window.app.classWorker.hasClass(event.target, 'dropzone')) {
                    window.app.classWorker.removeClass(event.target, 'drag-enter');
                }
            }, false);

            //final drop
            document.addEventListener('drop', function (event) {
                event.preventDefault();
                // move dragged el to the selected drop target
                if (window.app.classWorker.hasClass(event.target, 'dropzone')) {
                    window.app.classWorker.addClass(event.target, 'changed');
                    dragged.parentNode.removeChild(dragged);
                    event.target.appendChild(dragged);
                }
            }, false);
        }
    }]);

    return DragDropClass;
})();

;

module.exports = DragDropClass;

},{}],3:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var CssClassesClass = (function () {
	function CssClassesClass(options) {
		_classCallCheck(this, CssClassesClass);

		this.options = options;
	}

	_createClass(CssClassesClass, [{
		key: 'addClass',
		value: function addClass(el, className) {
			if (!this.hasClass(el, className)) {
				el.className += ' ' + className;
			}
		}
	}, {
		key: 'removeClass',
		value: function removeClass(el, className) {
			var containes = el.className.split(' ');
			for (var i = 0, len = containes.length; i < len; i++) {
				if (containes[i] === className) {
					containes.splice(i, 1);
					el.className = containes.join(' ');
					break;
				}
			}
		}
	}, {
		key: 'hasClass',
		value: function hasClass(el, className) {
			var containes = el.className.split(' ');
			for (var i = 0, len = containes.length; i < len; i++) {
				if (containes[i] === className) {
					return true;
					break;
				}
			}
			return false;
		}
	}]);

	return CssClassesClass;
})();

module.exports = CssClassesClass;

},{}]},{},[1]);
