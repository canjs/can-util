'use strict';

var namespace = require("can-namespace");

module.exports = namespace.last = function(arr) {
	return arr && arr[arr.length - 1];
};
