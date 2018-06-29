'use strict';

var dev = require('can-log/dev/dev');
var namespace = require("can-namespace");

var hasWarned = false;

/**
 * @module {function} can-util/js/is-string/is-string is-string
 * @parent deprecated
 * @signature `isString(obj)`
 *
 * **Deprecated**:
 * This method is will be removed in can-util 4.0.
 * Use `typeof obj === 'string'` instead of `isString(obj)`.
 *
 * Determines if the provided argument is a string.
 *
 * ```js
 * var isString = require("can-util/js/is-string/is-string");
 *
 * console.log(isString("foo")); // -> true
 * console.log(isString(String("foo")); // -> true
 *
 * console.log(isString({})); // -> false
 * ```
 *
 * @param {*} obj An object to test if is a string.
 * @return {Boolean} True if the object is a string.
 */
module.exports = namespace.isString = function isString(obj) {
	//!steal-remove-start
	if (process.env.NODE_ENV !== 'production') {
		if (!hasWarned) {
			dev.warn('js/is-string/is-string is deprecated; use typeof x === "string"');
			hasWarned = true;
		}
	}
	//!steal-remove-end

	return typeof obj === 'string';
};
