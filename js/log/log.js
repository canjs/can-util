'use strict';

//var canDev = require("can-log/dev/dev");

/**
 * @module can-util/js/log/log log
 * @parent deprecated
 * @description Deprecated. Use [can-log] instead.
 */

 //!steal-remove-start
if (process.env.NODE_ENV !== 'production') {
	//  canDev.warn('js/log/log is deprecated; please use can-log instead: https://github.com/canjs/can-log');
}
 //!steal-remove-end

module.exports = require('can-log');
