'use strict';

var global = require("../global/global")();

/**
 * @module can-util/js/set-immediate/set-immediate set-immediate
 * @parent can-util/js
 * @signature `setImmediate(function())`
 * @param  {Function} cb
 *
 * Polyfill for setImmediate() if it doesn't exist in the global context
 */
module.exports = global.setImmediate || function (cb) {
	return setTimeout(cb, 0);
};
