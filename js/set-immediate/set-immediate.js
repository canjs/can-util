'use strict';

var global = require('can-globals/global/global')();
var namespace = require("can-namespace");

/**
 * @module can-util/js/set-immediate/set-immediate set-immediate
 * @parent can-util/js
 * @signature `setImmediate(function())`
 * @param  {Function} cb
 *
 * Polyfill for setImmediate() if it doesn't exist in the global context
 */
module.exports = namespace.setImmediate = global.setImmediate || function (cb) {
	return setTimeout(cb, 0);
};
