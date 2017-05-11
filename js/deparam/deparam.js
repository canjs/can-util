'use strict';

var canDev = require("../dev/dev");

/**
 * @module can-util/js/deparam/deparam deparam
 * @parent can-util/js
 * @description Deprecated. Use [can-deparam] instead.
 */

 //!steal-remove-start
 canDev.warn('js/deparam/deparam is deprecated; please use can-deparam instead: https://github.com/canjs/can-deparam');
 //!steal-remove-end

module.exports = require('can-deparam');
