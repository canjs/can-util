var isFunction = require('../is-function/is-function');

module.exports = function(moduleName, parentName) {
	return new Promise(function(resolve, reject) {
		if(typeof window.System === "object" && isFunction(window.System["import"])) {
			window.System["import"](moduleName, {
				name: parentName
			}).then(resolve, reject);
		} else if(window.define && window.define.amd){
			window.require([moduleName], function(value){
				resolve(value);
			});
		} else if(window.require){
			resolve(window.require(moduleName));
		} else {
			// ideally this will use can.getObject
			resolve();
		}
	});
};
