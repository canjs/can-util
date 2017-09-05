'use strict';

var canDev = require("can-util/js/dev/dev");

/**
 * @module can-util/js/mutation-observer/mutation-observer mutation-observer
 * @parent can-util/js
 * @description Deprecated. Use [can-globals] instead.
 */

 //!steal-remove-start
 canDev.warn('js/mutation-observer/mutation-observer is deprecated; please use can-global instead: https://github.com/canjs/can-globals');
 //!steal-remove-end

module.exports = require('can-globals/mutation-observer/mutation-observer');
