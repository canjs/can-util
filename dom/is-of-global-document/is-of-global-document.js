'use strict';

var getDocument = require('can-globals/document/document');
module.exports = function(el) {
	return (el.ownerDocument || el) === getDocument();
};
