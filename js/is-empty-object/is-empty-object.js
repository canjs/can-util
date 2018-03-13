'use strict';

/* jshint unused: false */

var namespace = require("can-namespace");

/**
 * @module {function} can-util/js/is-empty-object/is-empty-object is-empty-object
 * @parent can-util/js
 * @signature `isEmptyObject(obj)`
 *
 * Used to determine if an object is an empty object (an object with no enumerable properties) such as `{}`.
 *
 * ```js
 * var isEmptyObject = require("can-util/js/is-empty-object/is-empty-object");
 *
 * console.log(isEmptyObject({})); // -> true
 *
 * console.log(isEmptyObject({ a: 1 })); // -> false
 *
 * var obj = {};
 * Object.defineProperty(obj, "foo", {
 *     enumerable: false,
 *     value: "bar"
 * });
 * console.log(isEmptyObject(obj)); // -> true
 * ```
 *
 * @param {Object} obj Any object.
 * @return {Boolean} True if the object is an object with no enumerable properties.
 */
module.exports = namespace.isEmptyObject = function(obj) {
	for(var prop in obj) {
		return false;
	}
	return true;
};
