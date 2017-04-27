'use strict';

/**
 * @module {function} can-util/js/global/global global
 * @parent can-util/js
 * @signature `GLOBAL()`
 *
 * Returns the global that this environment provides. It will be one of:
 *
 * * **Browser**: `window`
 * * **Web Worker**: `self`
 * * **Node.js**: `global`
 *
 * ```js
 * var GLOBAL = require("can-util/js/global/global");
 *
 * var g = GLOBAL();
 *
 * // In a browser
 * console.log(g === window); // -> true
 * ```
 *
 * @return {Object} The global object for this JavaScript environment.
 */

/* global self */
/* global WorkerGlobalScope */
var GLOBAL;
module.exports = function(setGlobal){
	// Web Worker
	if(setGlobal !== undefined) {
		GLOBAL = setGlobal;
	}
	if(GLOBAL) {
		return GLOBAL;
	} else {
		return GLOBAL = (typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope) ? self :

			// Node.js
			typeof process === "object" &&
			{}.toString.call(process) === "[object process]" ? global :

			// Browser window
			window;
	}

};
