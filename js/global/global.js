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
module.exports = function(){
	// Web Worker
	return (typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope) ? self :

		// Node.js
		typeof process === "object" &&
		{}.toString.call(process) === "[object process]" ? global :

		// Browser window
		window;
};
