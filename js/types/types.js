'use strict';

var canDev = require("can-log/dev/dev");

/**
 * @module can-util/js/types/types types
 * @parent deprecated
 * @description Deprecated. Use [can-types] instead.
 */

//!steal-remove-start
if (process.env.NODE_ENV !== 'production') {
	canDev.warn('js/types/types is deprecated; please use can-types instead: https://github.com/canjs/can-types');
}
//!steal-remove-end

module.exports = require('can-types');
