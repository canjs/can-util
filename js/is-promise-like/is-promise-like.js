'use strict';

/**
 * @module {function} can-util/js/is-promise-like/is-promise-like is-promise-like
 * @parent can-util/js
 * @signature `isPromiseLike(obj)`
 *
 * Determines if an object is "Then-able".
 * Also see `isPromise(obj)` which checks for a standard [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).
 *
 * ```js
 * var isPromiseLike = require("can-util/js/is-promise-like/is-promise-like");
 *
 * var promise = new Promise(function(resolve){
 *   resolve();
 * });
 *
 * console.log(isPromiseLike(promise)); // -> true
 * console.log(isPromiseLike("foo bar")); // -> false
 * ```
 *
 * @param {Object} obj An object to be tested.
 * @return {Boolean} True if the object is a Promise.
 */
module.exports = function(obj){
	return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
};
