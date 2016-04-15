module.exports = function(moduleName, parentName) {
	var deferred = new can.Deferred();

	if(typeof window.System === "object" && can.isFunction(window.System["import"])) {
		window.System["import"](moduleName, {
			name: parentName
		}).then(can.proxy(deferred.resolve, deferred),
			can.proxy(deferred.reject, deferred));
	} else if(window.define && window.define.amd){

		window.require([moduleName], function(value){
			deferred.resolve(value);
		});

	} else if(window.require){
		deferred.resolve(window.require(moduleName));
	} else {
		// ideally this will use can.getObject
		deferred.resolve();
	}

	return deferred.promise();
};
