'use strict';

var canDev = require("can-log/dev/dev");

/**
 * @module can-util/js/cid/cid cid
 * @parent deprecated
 * @description Deprecated. Use [can-cid] instead.
 */

//!steal-remove-start
if (process.env.NODE_ENV !== 'production') {
	canDev.warn('js/cid/cid is deprecated; please use can-cid instead: https://github.com/canjs/can-cid');
}
//!steal-remove-end

module.exports = require('can-cid');
