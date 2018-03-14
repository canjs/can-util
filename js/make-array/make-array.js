'use strict';

var each = require('../each/each');
var isArrayLike = require('../is-array-like/is-array-like');
var namespace = require("can-namespace");

/**
 * @module {function} can-util/js/make-array/make-array make-array
 * @parent can-util/js
 * @signature `makeArray(element)`
 * @param  {ArrayLike|Object} element any array-like or object data structure
 * @return {Array}     a JavaScript array object with the same elements as the passed-in ArrayLike
 *
 * makeArray takes any array-like object (can-list, NodeList, etc.) and converts it to a JavaScript array
 *
 * ```
 * var makeArray = require("can-util/js/make-array/make-array");
 *
 * makeArray({0: "a", length: 1}); //-> ["a"]
 *
 * ```
 */
function makeArray(element) {
	var ret = [];
	if (isArrayLike(element)) {
		each(element, function (a, i) {
			ret[i] = a;
		});
	} else if(element === 0 || element) {
		ret.push(element);
	}
	return ret;
}

module.exports = namespace.makeArray = makeArray;
