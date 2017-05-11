'use strict';

var each = require('../each/each');

/**
 * @module {function} can-util/js/make-map/make-map make-map
 * @parent can-util/js
 * @signature `makeMap( string )`
 * @param  {String} string A comma separated list of values
 * @return {Object} A JavaScript object with the same keys as the passed-in comma-separated values
 *
 * makeMap takes a comma-separated string (can-list, NodeList, etc.) and converts it to a JavaScript object
 * 
 * ```
 * var makeMap = require("can-util/js/make-map/make-map");
 * 
 * makeMap("a,b,c"); //-> { a: true, b: true, c: true }
 * ```
 */
function makeMap(str) {
	var obj = {}, items = str.split(",");
	each(items, function(name){
		obj[name] = true;
	});
	return obj;
}

module.exports = makeMap;
