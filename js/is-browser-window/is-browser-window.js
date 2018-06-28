'use strict';

//var canDev = require("can-log/dev/dev");
var namespace = require("can-namespace");

/**
 * @module can-util/js/is-browser-window/is-browser-window is-browser-window
 * @parent deprecated
 * @description Deprecated. Use [can-globals] instead.
 */

//!steal-remove-start
if (process.env.NODE_ENV !== 'production') {
	// canDev.warn('js/is-browser-window/is-browser-window is deprecated; please use can-globals instead: https://github.com/canjs/can-globals');
}
//!steal-remove-end

module.exports = namespace.isBrowserWindow = require('can-globals/is-browser-window/is-browser-window');
