/* jshint unused: false */

/**
 * @function can-util/js/is-empty-object isEmptyObject
 * @description Determines if an object is an object with no properties.
 * @signature `isEmptyObject(obj)`
 *
 * Used to determine if an object is an empty object (an object with no properties) such as `{}`.
 *
 * ```js
 * var isEmptyObject = require("can-util/js/is-empty-object/is-empty-object");
 *
 * console.log(isEmptyObject({})); // -> true
 *
 * console.log(isEmptyObject({ a: 1 })); // -> false
 * ```
 *
 * @param {Object} obj Any object.
 * @return {Boolean} True if the object is an object with no properties.
 */
module.exports = function(obj){
	for(var prop in obj) {
		return false;
	}
	return true;
};
