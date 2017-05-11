'use strict';

/**
 * @module {function} can-util/js/make-promise/make-promise make-promise
 * @parent can-util/js
 * @signature `makePromise(obj)`
 *
 * Will make isPromiseLike object into [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).
 *
 * ```js
 * var makePromise = require("can-util/js/make-promise/make-promise");
 *
 * var obj = {};
 * var promise = makePromise(obj);
 *
 * console.log(isPromise(promise)); // -> true
 * console.log(isPromise(obj)); // -> false
 * ```
 *
 * @param {Object} obj An object to be made into Promise.
 * @return {Promise} the object as a Promise.
 */
var isPromiseLike = require('../is-promise-like/is-promise-like');
var isPromise = require('../is-promise/is-promise');

module.exports = function(obj){
	if (isPromiseLike(obj) && !isPromise(obj)) {
		return new Promise(function(resolve, reject) {
			obj.then(resolve, reject);
		});
	}
	else {
		return obj;
	}
};
