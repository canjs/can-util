'use strict';

var canDev = require("can-log/dev/dev");

/**
 * @module can-util/js/param/param param
 * @parent can-util/js
 * @description Deprecated. Use [can-param] instead.
 */

 //!steal-remove-start
 canDev.warn('js/param/param is deprecated; please use can-param instead: https://github.com/canjs/can-param');
 //!steal-remove-end

module.exports = require('can-param');
