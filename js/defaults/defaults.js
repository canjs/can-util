'use strict';


/**
 * @module {function} can-util/js/defaults/defaults defaults
 * @parent can-util/js
 * @signature `defaults(target, [ ... sources])`
 *
 * Mimics [_.defaults](https://lodash.com/docs/4.16.2#defaults). Assigns first level properties in sources from left to
 * right if they are not already defined.
 *
 * ```js
 * var defaults = require("can-util/js/defaults/defaults");
 *
 * var obj = {a: 1, b: 2};
 * var src = {b: 3, c: 3};
 *
 * assign(obj, src, {a: 2, d: 4});
 *
 * console.log(obj); // -> {a: 1, b: 2, c: 3, d: 4}
 * ```
 *
 * @param {Object} target The destination object. This object's properties will be mutated based on the objects provided as [ ... sources].
 * @param {Object} [ ... sources] The source objects whose own properties will be applied to `target`.
 *
 * @return {Object} Returns the `target` argument.
 */

module.exports = function (target) {
	var length = arguments.length;
	for (var i = 1; i < length; i++) {
		for (var prop in arguments[i]) {
			if (target[prop] === undefined) {
				target[prop] = arguments[i][prop];
			}
		}
	}
	return target;
};
