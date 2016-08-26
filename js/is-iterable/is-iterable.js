var types = require("../types/types");

module.exports = function(obj) {
	return obj && !!obj[types.iterator];
};
