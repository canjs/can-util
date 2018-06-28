'use strict';

//var canDev = require("can-log/dev/dev");

/**
 * @module can-util/js/location/location location
 * @parent deprecated
 * @description Deprecated. Use [can-globals] instead.
 */

 //!steal-remove-start
if (process.env.NODE_ENV !== 'production') {
	//  canDev.warn('js/location/location is deprecated; please use can-globals instead: https://github.com/canjs/can-globals');
}
 //!steal-remove-end

module.exports = require('can-globals/location/location');
