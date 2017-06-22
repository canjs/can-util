import isFunction from '../is-function/is-function.js';
import _globalGlobal from '../global/global.js';

let _moduleExports;

export default _moduleExports;

var global = _globalGlobal();

/**
 * @module {function} can-util/js/import/import import
 * @parent can-util/js
 * @signature `importModule(moduleName, parentName)`
 *
 * ```js
 * var importModule = require("can-util/js/import/import");
 *
 * importModule("foo.stache").then(function(){
 *   // module was imported
 * });
 * ```
 *
 * @param {String} moduleName The module to be imported.
 * @param {String} [parentName] A parent module that will be used as a reference for resolving relative module imports.
 * @return {Promise} A Promise that will resolve when the module has been imported.
 */

_moduleExports = function (moduleName, parentName) {
	return new Promise(function (resolve, reject) {
		try {
			if (typeof global.System === "object" && isFunction(global.System["import"])) {
				global.System["import"](moduleName, {
					name: parentName
				}).then(resolve, reject);
			} else if (global.define && global.define.amd) {
				global.require([moduleName], function (value) {
					resolve(value);
				});
			} else if (global.require) {
				resolve(global.require(moduleName));
			} else {
				// ideally this will use can.getObject
				resolve();
			}
		} catch (err) {
			reject(err);
		}
	});
};