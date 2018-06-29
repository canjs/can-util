'use strict';

//var canDev = require("can-log/dev/dev");
var globals = require('can-globals');
var namespace = require("can-namespace");

/**
 * @module can-util/js/mutation-observer/mutation-observer mutation-observer
 * @parent deprecated
 * @description Deprecated. Use [can-globals] instead.
 */

//!steal-remove-start
if (process.env.NODE_ENV !== 'production') {
	// canDev.warn('js/mutation-observer/mutation-observer is deprecated; please use can-globals instead: https://github.com/canjs/can-globals');
}
//!steal-remove-end

module.exports = namespace.mutationObserver = function(setMO) {
	if(setMO !== undefined) {
		globals.setKeyValue('MutationObserver', function(){
			return setMO;
		});
	}
	return globals.getKeyValue('MutationObserver');
};
