/**
 * @module {function} can-util/js/assign/assign assign
 * @parent can-util/js
 * @signature `assign(target, args)`
 *
 * A simplified version of [Object.assign](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign), which only accepts a single source argument.
 *
 * ```js
 * var assign = require("can-util/js/assign/assign");
 *
 * var obj = {};
 *
 * assign(obj, {
 *   foo: "bar"
 * });
 *
 * console.log(obj.foo); // -> "bar"
 * ```
 *
 * @param {Object} target The destination object. This object's properties will be mutated based on the object provided as `source`.
 * @param {Object} args The source objects whose own properties will be applied to `target`.
 *
 * @return {Object} Returns the `target` argument.
 */

module.exports = function (target, args) {
	if (target === null) {
  	throw new TypeError('The target object cannot be undefined or null');
  }
	for (var i = 1; i < arguments.length; i++) {
		var supplier = arguments[i];

		if (supplier !=null) {
			for (var prop in supplier) {
				if (Object.prototype.hasOwnProperty.call(supplier, prop)) {
					target[prop] = supplier[prop];
				}
			}
		}
	}
	return target;
};
