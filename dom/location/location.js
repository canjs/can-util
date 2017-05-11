'use strict';

var global = require("../../js/global/global");

/**
 * @module {function} can-util/dom/location/location location
 * @parent can-util/dom
 * @signature `location(location)`
 *
 * @param {Object} location An optional location-like object
 * to set as the context's location
 *
 * Optionally sets, and returns, the location object for the context.
 *
 * ```js
 * var locationShim = { path: '/' };
 * var LOCATION = require("can-util/dom/location/location");
 * LOCATION(locationShim);
 *
 * ...
 * LOCATION().path; // -> '/'
 * ```
 */
var setLocation;
module.exports = function(setLoc){
	if(setLoc) {
		setLocation = setLoc;
	}
	//return setDocument || global().document;
	return setLocation || global().location;
};
