'use strict';

var getDocument = require('can-globals/document/document');
var namespace = require("can-namespace");

module.exports = namespace.isOfGlobalDocument = function(el) {
	return (el.ownerDocument || el) === getDocument();
};
