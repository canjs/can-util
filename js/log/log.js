'use strict';

exports.warnTimeout = 5000;
exports.logLevel = 0;

/**
 * @module {{}} can-util/js/log/log log
 * @parent can-util/js
 * 
 * Utilities for logging to the console.
 */

/**
 * @function can-util/js/log/log.warn warn
 * @parent can-util/js/log/log
 * @description
 * 
 * Adds a warning message to the console.
 *
 * ```
 * var canLog = require("can-util/js/log/log");
 * 
 * canLog.warn("something evil");
 * ```
 *
 * @signature `canLog.warn(msg)`
 * @param {String} msg the message to be logged.
 */
exports.warn = function(out) {
	var ll = this.logLevel;
	if (ll < 2) {
		Array.prototype.unshift.call(arguments, 'WARN:');
		if (typeof console !== "undefined" && console.warn) {
			this._logger("warn", Array.prototype.slice.call(arguments));
		} else if (typeof console !== "undefined" && console.log) {
			this._logger("log", Array.prototype.slice.call(arguments));
		} else if (window && window.opera && window.opera.postError) {
			window.opera.postError("CanJS WARNING: " + out);
		}
	}
};

/**
 * @function can-util/js/log/log.log log
 * @parent can-util/js/log/log
 * @description
 * Adds a message to the console.
 *
 * ```
 * var canLog = require("can-util/js/log/log");
 * 
 * canLog.log("hi");
 * ```
 *
 * @signature `canLog.log(msg)`
 * @param {String} msg the message
 */
exports.log = function(out) {
	var ll = this.logLevel;
	if (ll < 1) {
		if (typeof console !== "undefined" && console.log) {
			Array.prototype.unshift.call(arguments, 'INFO:');
			this._logger("log", Array.prototype.slice.call(arguments));
		} else if (window && window.opera && window.opera.postError) {
			window.opera.postError("CanJS INFO: " + out);
		}
	}
};

/**
 * @function can-util/js/log/log.error error
 * @parent can-util/js/log/log
 * @description
 * Adds an error message to the console.
 *
 * ```
 * var canLog = require("can-util/js/log/log");
 * 
 * canLog.error(new Error("Oh no!"));
 * ```
 *
 * @signature `canLog.error(err)`
 * @param {String|Error} err The error to be logged.
 */
exports.error = function(out) {
	var ll = this.logLevel;
	if (ll < 1) {
		if (typeof console !== "undefined" && console.error) {
			Array.prototype.unshift.call(arguments, 'ERROR:');
			this._logger("error", Array.prototype.slice.call(arguments));
		} else if (window && window.opera && window.opera.postError) {
			window.opera.postError("ERROR: " + out);
		}
	}
};

exports._logger = function (type, arr) {
	try {
		console[type].apply(console, arr);
	} catch(e) {
		console[type](arr);
	}
};
