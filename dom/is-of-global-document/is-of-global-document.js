'use strict';

var getDocument = require('../document/document');
module.exports = function(el) {
	return (el.ownerDocument || el) === getDocument();
};
