'use strict';

var canDev = require("can-log/dev/dev");
var namespace = require("can-namespace");

/**
 * @module can-util/dom/ajax/ajax ajax
 * @parent deprecated
 * @description Deprecated. Use [can-ajax] instead.
 */

 //!steal-remove-start
if (process.env.NODE_ENV !== 'production') {
	canDev.warn('dom/ajax/ajax is deprecated; please use can-ajax instead: https://github.com/canjs/can-ajax');
}
 //!steal-remove-end

module.exports = namespace.ajax = require('can-ajax');
