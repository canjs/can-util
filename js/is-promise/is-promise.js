'use strict';

var canReflect = require('can-reflect');
var namespace = require("can-namespace");

/**
 * @module {function} can-util/js/is-promise/is-promise is-promise
 * @parent can-util/js
 * @signature `isPromise(obj)`
 *
 * Determines if object is a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).
 *
 * ```js
 * var isPromise = require("can-util/js/is-promise/is-promise");
 *
 * var promise = new Promise(function(resolve){
 *   resolve();
 * });
 *
 * console.log(isPromise(promise)); // -> true
 * console.log(isPromise("foo bar")); // -> false
 * ```
 *
 * @param {Object} obj An object to be tested.
 * @return {Boolean} True if the object is a Promise.
 */
module.exports = namespace.isPromise = function(obj) {
	return canReflect.isPromise(obj);
};
