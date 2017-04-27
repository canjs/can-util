'use strict';

var matchesMethod = function(element) {
	return element.matches || element.webkitMatchesSelector || element.webkitMatchesSelector ||
		element.mozMatchesSelector || element.msMatchesSelector || element.oMatchesSelector;
};

module.exports = function(){
	var method = matchesMethod(this);
	return method ? method.apply(this, arguments) : false;
};
