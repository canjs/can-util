import canLog from "../log/log";

let _moduleExports;

export default _moduleExports;


/**
 * @module {{}} can-util/js/dev/dev dev
 * @parent can-util/js
 *
 * Utilities for logging development-mode messages. Use this module for
 * anything that should be shown to the user during development but isn't
 * needed in production. In production these functions become noops.
 */
_moduleExports = {
	warnTimeout: 5000,
	logLevel: 0,
	/**
  * @function can-util/js/dev/dev.warn warn
  * @parent can-util/js/dev/dev
  * @description
  *
  * Adds a warning message to the console.
  *
  * ```
  * dev.warn("something evil");
  * ```
  *
  * @signature `dev.warn(msg)`
  * @param {String} msg The warning message.
  */
	warn: function () {
		//!steal-remove-start
		canLog.warn.apply(this, arguments);
		//!steal-remove-end
	},
	/**
  * @function can-util/js/dev/dev.log log
  * @parent can-util/js/dev/dev
  * @description
  *
  * Adds a message to the console.
  *
  * ```
  * dev.log("hi");
  * ```
  *
  * @signature `dev.log(msg)`
  * @param {String} msg The message.
  */
	log: function () {
		//!steal-remove-start
		canLog.log.apply(this, arguments);
		//!steal-remove-end
	},
	/**
  * @function can-util/js/dev/dev.error error
  * @parent can-util/js/dev/dev
  * @description
  *
  * Adds an error message to the console.
  *
  * ```
  * dev.error(new Error("Oh no!"));
  * ```
  *
  * @signature `dev.error(err)`
  * @param {String|Error} err The error to be logged.
  */
	error: function () {
		//!steal-remove-start
		canLog.error.apply(this, arguments);
		//!steal-remove-end
	},
	_logger: canLog._logger
};