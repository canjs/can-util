'use strict';

//var canDev = require("can-log/dev/dev");

/**
 * @module can-util/js/cid-map/cid-map cid-map
 * @parent deprecated
 * @description Deprecated. Use [can-cid/map/map] instead.
 */

//!steal-remove-start
// canDev.warn('js/cid-map/cid-map is deprecated; please use can-globals instead: https://github.com/canjs/can-cid');
//!steal-remove-end

module.exports = require('can-cid/map/map');
