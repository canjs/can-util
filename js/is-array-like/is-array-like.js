'use strict';

var namespace = require("can-namespace");

// The following is from jQuery
function isArrayLike(obj){
	var type = typeof obj;
	if(type === "string") {
		return true;
	}
	else if(type === "number") {
		return false;
	}
	// The `in` check is from jQuery’s fix for an iOS 8 64-bit JIT object length bug:
	// https://github.com/jquery/jquery/pull/2185
	var length = obj && type !== 'boolean' &&
		typeof obj !== 'number' &&
		"length" in obj && obj.length;

	// var length = "length" in obj && obj.length;
	return typeof obj !== "function" &&
		( length === 0 || typeof length === "number" && length > 0 && ( length - 1 ) in obj );
}

module.exports = namespace.isArrayLike = isArrayLike;
