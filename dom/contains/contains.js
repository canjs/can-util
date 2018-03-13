'use strict';

var namespace = require("can-namespace");

module.exports = namespace.contains = function(child){
	return this.contains(child);
};
