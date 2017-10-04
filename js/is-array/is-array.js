'use strict';

var dev = require('can-log/dev/dev');
var hasWarned = false;

module.exports = function(arr) {
	//!steal-remove-start
	if (!hasWarned) {
		dev.warn('js/is-array/is-array is deprecated; use Array.isArray');
		hasWarned = true;
	}
	//!steal-remove-end

	return Array.isArray(arr);
};
