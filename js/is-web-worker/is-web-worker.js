'use strict';

var namespace = require("can-namespace");

/**
 * @module {function} can-util/js/is-web-worker/is-web-worker is-web-worker
 * @parent can-util/js
 * @description Determines if the code is running with a [Web Worker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers).
 * @signature `isWebWorker()`
 *
 * ```js
 * var isWebWorker = require("can-util/js/is-web-worker/is-web-worker");
 * var GLOBAL = require("can-globals/global/global");
 *
 * if(isWebWorker()) {
 *   console.log(GLOBAL() === self); // -> true
 * }
 * ```
 *
 * @return {Boolean} True if running in a Web Worker.
 */

/* globals WorkerGlobalScope */
module.exports = namespace.isWebWorker = function() {
	return typeof WorkerGlobalScope !== "undefined" &&
		(this instanceof WorkerGlobalScope);
};
