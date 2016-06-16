/**
 * @module {function} can-util/js/is-function/is-function isFunction
 * @signature `isFunction(value)`
 *
 * ```js
 * var isFunction = require("can-util/js/is-function/is-function");
 *
 * console.log(isFunction(function(){})); // -> true
 *
 * console.log(isFunction({})); // -> false
 * ```
 *
 * @return {Boolean} True if the provided argument is a function.
 */

var isFunction = (function() {
	if (typeof document !== 'undefined' && typeof document.getElementsByTagName('body') === 'function') {
		return function(value) {
			return Object.prototype.toString.call(value) === '[object Function]';
		};
	}
	return function(value) {
		return typeof value === 'function';
	};
}());

module.exports = isFunction;
