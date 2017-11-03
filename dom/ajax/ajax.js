'use strict';

var canDev = require("can-log/dev/dev");

/**
 * @module can-util/dom/ajax/ajax ajax
 * @parent deprecated
 * @description Deprecated. Use [can-ajax] instead.
 */

 //!steal-remove-start
 canDev.warn('dom/ajax/ajax is deprecated; please use can-ajax instead: https://github.com/canjs/can-ajax');
 //!steal-remove-end

module.exports = require('can-ajax');
