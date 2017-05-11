'use strict';

var types = require("can-types");

module.exports = function(obj) {
	return obj && !!obj[types.iterator];
};
