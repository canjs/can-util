var matchesMethod = function(element) {
	return element.matches || element.webkitMatchesSelector || element.webkitMatchesSelector ||
		element.mozMatchesSelector || element.msMatchesSelector || element.oMatchesSelector;
};

module.exports = function(){
	return matchesMethod(this).apply(this, arguments);
};
