'use strict';

var isFunction = require('../is-function/is-function');
var isPlainObject = require('../is-plain-object/is-plain-object');
var namespace = require("can-namespace");

function deepAssign() {
	/*jshint maxdepth:6 */
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length;

	// Handle case when target is a string or something (possible in deep copy)
	if (typeof target !== "object" && !isFunction(target)) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if (length === i) {
		/*jshint validthis:true*/
		target = this;
		--i;
	}

	for (; i < length; i++) {
		// Only deal with non-null/undefined values
		if ((options = arguments[i]) != null) {
			// Extend the base object
			for (name in options) {
				src = target[name];
				copy = options[name];

				// Prevent never-ending loop
				if (target === copy) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if (copy && (isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
					if (copyIsArray) {
						copyIsArray = false;
						clone = src && Array.isArray(src) ? src : [];

					} else {
						clone = src && isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[name] = deepAssign(clone, copy);

					// Don't bring in undefined values
				} else if (copy !== undefined) {
					target[name] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
}

module.exports = namespace.deepAssign = deepAssign;
