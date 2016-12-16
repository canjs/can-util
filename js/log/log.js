exports.warnTimeout = 5000;
exports.logLevel = 0;

/**
 * Adds a warning message to the console.
 * ```
 * canLog.warn("something evil");
 * ```
 * @param {String} out the message
 */
exports.warn = function (out) {
	var ll = this.logLevel;
	if (ll < 2) {
		Array.prototype.unshift.call(arguments, 'WARN:');
		if (typeof console !== "undefined" && console.warn) {
			this._logger("warn", Array.prototype.slice.call(arguments));
		} else if (typeof console !== "undefined" && console.log) {
			this._logger("log", Array.prototype.slice.call(arguments));
		} else if (window && window.opera && window.opera.postError) {
			window.opera.postError("steal.js WARNING: " + out);
		}
	}
};

/**
 * Adds a message to the console.
 * ```
 * canLog.log("hi");
 * ```
 * @param {String} out the message
 */
exports.log = function (out) {
	var ll = this.logLevel;
	if (ll < 1) {
		if (typeof console !== "undefined" && console.log) {
			Array.prototype.unshift.call(arguments, 'Info:');
			this._logger("log", Array.prototype.slice.call(arguments));
		} else if (window && window.opera && window.opera.postError) {
			window.opera.postError("steal.js INFO: " + out);
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
