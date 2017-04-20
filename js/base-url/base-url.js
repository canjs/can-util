'use strict';

var getGlobal = require("../global/global");

/**
 * @module {function} can-util/js/base-url/base-url base-url
 * @parent can-util/js
 * @signature `baseUrl(optionalBaseUrlToSet)`
 *
 * Get and/or set the "base" (containing path) of the document.
 *
 * ```js
 * var baseUrl = require("can-util/js/base-url/base-url");
 *
 * console.log(baseUrl());           // -> "http://localhost:8080"
 * console.log(baseUrl(baseUrl() + "/foo/bar")); // -> "http://localhost:8080/foo/bar"
 * console.log(baseUrl());           // -> "http://localhost:8080/foo/bar"
 * ```
 *
 * @param {String} setUrl An optional base url to override reading the base URL from the known path.
 *
 * @return {String} Returns the set or computed base URL
 */

var setBaseUrl;
module.exports = function(setUrl){
	if(setUrl !== undefined) {
		setBaseUrl = setUrl;
	}
	if(setBaseUrl !== undefined) {
		return setBaseUrl;
	}
	var global = getGlobal();
	if(global.location) {
		var href = global.location.href;
		var lastSlash = href.lastIndexOf("/");
		return lastSlash !== -1 ? href.substr(0, lastSlash) : href;
	} else if(typeof process !== "undefined") {
		return process.cwd();
	}
};
