var global = require("../global/global")();

module.exports = global.setImmediate || function (cb) {
	return setTimeout(cb, 0);
};
