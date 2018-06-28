'use strict';

var canDev = require("can-log/dev/dev");

/**
 * @module can-util/js/param/param param
 * @parent deprecated
 * @description Deprecated. Use [can-param] instead.
 */

 //!steal-remove-start
if (process.env.NODE_ENV !== 'production') {
	canDev.warn('js/param/param is deprecated; please use can-param instead: https://github.com/canjs/can-param');
}
 //!steal-remove-end

module.exports = require('can-param');
