/* jshint maxdepth:7*/
var isArrayLike = require('can-util/js/is-array-like/');

function each(elements, callback, context) {
	var i = 0,
		key,
		len,
		item;
	if (elements) {
		if ( isArrayLike(elements) ) {

			for (len = elements.length; i < len; i++) {
				item = elements[i];
				if (callback.call(context || item, item, i, elements) === false) {
					break;
				}
			}
		}
		 else if (typeof elements === "object") {
			for (key in elements) {
				if (Object.prototype.hasOwnProperty.call(elements, key) && callback.call(context || elements[key], elements[key], key, elements) === false) {
					break;
				}
			}
		}
	}
	return elements;
}

module.exports = each;
