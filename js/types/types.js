'use strict';

var canDev = require("../dev/dev");

/**
 * @module can-util/js/types/types types
 * @parent can-util/js
 * @description Deprecated. Use [can-types] instead.
 */

//!steal-remove-start
canDev.warn('js/types/types is deprecated; please use can-types instead: https://github.com/canjs/can-types');
//!steal-remove-end

module.exports = require('can-types');
