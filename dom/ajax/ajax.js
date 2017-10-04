'use strict';

var canDev = require("can-log/dev/dev");

/**
 * @module can-util/js/ajax/ajax ajax
 * @parent can-util/js
 * @description Deprecated. Use [can-ajax] instead.
 */

 //!steal-remove-start
 canDev.warn('js/ajax/ajax is deprecated; please use can-ajax instead: https://github.com/canjs/can-ajax');
 //!steal-remove-end

module.exports = require('can-ajax');
