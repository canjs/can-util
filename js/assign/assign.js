'use strict';

//var canDev = require("can-log/dev/dev");
var namespace = require("can-namespace");

/**
 * @module can-util/js/assign/assign assign
 * @parent deprecated
 * @description Deprecated. Use [can-assign] instead.
 */

 //!steal-remove-start
if (process.env.NODE_ENV !== 'production') {
	//  canDev.warn('js/assign/assign is deprecated; please use can-assign instead: https://github.com/canjs/can-assign');
}
 //!steal-remove-end

module.exports = namespace.assign = require('can-assign');
