'use strict';

/* jshint maxdepth:7*/
var isArrayLike = require('../is-array-like/is-array-like');
var has = Object.prototype.hasOwnProperty;
var isIterable = require("../is-iterable/is-iterable");
var canSymbol = require("can-symbol");
var namespace = require("can-namespace");

function each(elements, callback, context) {
	var i = 0,
		key,
		len,
		item;
	if (elements) {
		if ( isArrayLike(elements) ) {

			for (len = elements.length; i < len; i++) {
				item = elements[i];
				if (callback.call(context || item, item, i, elements) === false) {
					break;
				}
			}
		}
		// Works in anything that implements Symbol.iterator
		else if(isIterable(elements)) {
			var iter = elements[canSymbol.iterator || canSymbol.for("iterator")]();
			var res, value;

			while(!(res = iter.next()).done) {
				value = res.value;
				callback.call(context || elements, Array.isArray(value) ?
											value[1] : value, value[0]);
			}
		}
		 else if (typeof elements === "object") {
			for (key in elements) {
				if (has.call(elements, key) &&
						callback.call(context || elements[key],
													elements[key], key, elements) === false) {
					break;
				}
			}
		}
	}
	return elements;
}

module.exports = namespace.each = each;
