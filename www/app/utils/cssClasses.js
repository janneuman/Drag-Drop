class CssClassesClass {
	constructor(options) {
		this.options = options;
	}

	addClass(el, className) {
		if (!this.hasClass(el, className)) {
			el.className += ' ' + className;
		}
	}

	removeClass(el, className) {
		let containes = el.className.split(' ');
		for (let i = 0, len = containes.length; i < len; i++) {
			if (containes[i] === className) {
				containes.splice(i, 1);
				el.className = containes.join(' ');
				break;
			}
		}
	}

	hasClass(el, className) {
		let containes = el.className.split(' ');
		for (let i = 0, len = containes.length; i < len; i++) {
			if (containes[i] === className) {
				return true;
				break;
			}
		}
		return  false;
	}
}

module.exports = CssClassesClass;