'use strict';

var canDev = require("can-log/dev/dev");

/**
 * @module can-util/js/cid/cid cid
 * @parent can-util/js
 * @description Deprecated. Use [can-cid] instead.
 */

//!steal-remove-start
canDev.warn('js/cid/cid is deprecated; please use can-cid instead: https://github.com/canjs/can-cid');
//!steal-remove-end

module.exports = require('can-cid');
