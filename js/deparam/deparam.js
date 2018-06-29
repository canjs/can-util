'use strict';

var canDev = require("can-log/dev/dev");

/**
 * @module can-util/js/deparam/deparam deparam
 * @parent deprecated
 * @description Deprecated. Use [can-deparam] instead.
 */

 //!steal-remove-start
if (process.env.NODE_ENV !== 'production') {
 canDev.warn('js/deparam/deparam is deprecated; please use can-deparam instead: https://github.com/canjs/can-deparam');
}
 //!steal-remove-end

module.exports = require('can-deparam');
