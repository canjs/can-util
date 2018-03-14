'use strict';

var namespace = require("can-namespace");

/**
 * @module {function} can-util/js/is-node/is-node is-node
 * @parent can-util/js
 * @description Determines if your code is running in [Node.js](https://nodejs.org).
 * @signature `isNode()`
 *
 * ```js
 * var isNode = require("can-util/js/is-node/is-node");
 * var GLOBAL = require("can-globals/global/global");
 *
 * if(isNode()) {
 *   console.log(GLOBAL() === global); // -> true
 * }
 * ```
 *
 * @return {Boolean} True if running in Node.js
 */

module.exports = namespace.isNode = function() {
	return typeof process === "object" &&
		{}.toString.call(process) === "[object process]";
};
