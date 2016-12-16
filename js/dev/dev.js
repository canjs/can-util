var canLog = require("../log/log");

module.exports = {
	warnTimeout: 5000,
	logLevel: 0,
	/**
	 * Adds a warning message to the console.
	 * ```
	 * dev.warn("something evil");
	 * ```
	 * @param {String} out the message
	 */
	warn: function() {
		//!steal-remove-start
		canLog.warn.apply(this, arguments);
		//!steal-remove-end
	},
	/**
	 * Adds a message to the console.
	 * ```
	 * dev.log("hi");
	 * ```
	 * @param {String} out the message
	 */
	log: function() {
		//!steal-remove-start
		canLog.log.apply(this, arguments);
		//!steal-remove-end
	},
	_logger: canLog._logger
};
