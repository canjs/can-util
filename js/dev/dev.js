'use strict';

//var canDev = require("can-log/dev/dev");
var namespace = require("can-namespace");

/**
 * @module can-util/js/dev/dev dev
 * @parent deprecated
 * @description Deprecated. Use [can-dev] instead.
 */

 //!steal-remove-start
if (process.env.NODE_ENV !== 'production') {
	//  canDev.warn('js/dev/dev is deprecated; please use can-log/dev/dev instead: https://github.com/canjs/can-log');
}
 //!steal-remove-end

module.exports = namespace.dev = require('can-log/dev/dev');
