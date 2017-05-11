'use strict';

module.exports = function(obj, prop, value){
	Object.defineProperty(obj, prop, {
		configurable: true,
		enumerable: false,
		writable: true,
		value: value
	});
};
