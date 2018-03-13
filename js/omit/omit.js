'use strict';

var namespace = require("can-namespace");

/**
 * @module {function} can-util/js/omit/omit omit
 * @parent can-util/js
 * @signature `omit(source, propsToOmit)`
 *
 * Omit properties from an object.
 *
 * ```js
 * var omit = require("can-util/js/omit/omit");
 *
 * var obj = { a: 1, b: 2, c: 3, d: 4};
 *
 * var newObj = omit(obj, [ 'b', 'd' ]);
 *
 * console.log(newObj); // -> { a: 1, c: 3 }
 * ```
 *
 * @param {Object} source The source object whose non-omitted properties will be uses to source the result.
 * @param {Array} propsToOmit List of properties to omit from the result.
 *
 * @return {Object} Returns a new object with all of the properties from `source` that were not omitted.
 */
module.exports = namespace.omit = function (source, propsToOmit) {
	var result = {};
	for (var prop in source) {
		if (propsToOmit.indexOf(prop) < 0) {
			result[prop] = source[prop];
		}
	}
	return result;
};
