var getDocument = require('../document/');
module.exports = function(el) {
	return (el.ownerDocument || el) === getDocument();
};
