'use strict';

var namespace = require("can-namespace");

var matchesMethod = function(element) {
	return element.matches || element.webkitMatchesSelector || element.webkitMatchesSelector ||
		element.mozMatchesSelector || element.msMatchesSelector || element.oMatchesSelector;
};

module.exports = namespace.matches = function() {
	var method = matchesMethod(this);
	return method ? method.apply(this, arguments) : false;
};
