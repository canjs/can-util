"use strict";
var setNotEnumerable = require("../set-not-enumerable/set-not-enumerable");

/**
 * @module {function} can-util/js/assign-non-enumerable/assign-non-enumerable assign-non-enumerable
 * @parent can-util/js
 * @signature `assignNonEnumerable(target, source)`
 *
 * A simplified version of [Object.assign](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign), which only accepts a single source argument
 * and makes all assigned properties non enumerable and writable.
 *
 * ```js
 * var assignNonEnumerable = require("can-util/js/assign-non-enumerable/assign-non-enumerable");
 *
 * var obj = {};
 *
 * assignNonEnumerable(obj, {
 *   foo: "bar"
 * });
 *
 * console.log(obj.foo); // -> "bar"
 * ```
 *
 * @param {Object} target The destination object. This object's properties will be mutated based on the object provided as `source`.
 * @param {Object} source The source object whose own properties will be applied to `target`.
 *
 * @return {Object} Returns the `target` argument.
 */

module.exports = function (d, s) {
	for (var prop in s) {
		setNotEnumerable(d, prop, s[prop]);
	}
	return d;
};
