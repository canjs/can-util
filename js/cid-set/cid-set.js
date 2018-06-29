'use strict';

//var canDev = require("can-log/dev/dev");

/**
 * @module can-util/js/cid-set/cid-set cid-set
 * @parent deprecated
 * @description Deprecated. Use [can-cid/set/set] instead.
 */

//!steal-remove-start
if (process.env.NODE_ENV !== 'production') {
	// canDev.warn('js/cid-set/cid-set is deprecated; please use can-globals instead: https://github.com/canjs/can-cid');
}
//!steal-remove-end

module.exports = require('can-cid/set/set');
