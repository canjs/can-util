'use strict';

//var canDev = require("can-log/dev/dev");
var namespace = require("can-namespace");

/**
 * @module can-util/js/global/global global
 * @parent deprecated
 * @description Deprecated. Use [can-globals] instead.
 */

//!steal-remove-start
if (process.env.NODE_ENV !== 'production') {
	// canDev.warn('js/global/global is deprecated; please use can-globals instead: https://github.com/canjs/can-globals');
}
//!steal-remove-end

module.exports = namespace.global = require('can-globals/global/global');
