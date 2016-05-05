var isPromise = require('../is-promise/is-promise');

var types = {
	isMapLike: function(){
		return false;
	},
	isListLike: function(){
		return false;
	},
	isPromise: function(obj){
		return isPromise(obj);
	},
	isConstructor: function(func){
		/* jshint unused: false */
		if(typeof func !== "function") {
			return false;
		}
		// if there are any properties on the prototype, assume it's a constructor
		for(var prop  in func.prototype) {
			return true;
		}
		// We could also check if something is returned, if it is, probably not a constructor.
		return false;
	},
	isCallableForValue: function(obj){
		return typeof obj === "function" && !types.isConstructor(obj);
	},
	isCompute: function(obj){
		return obj && obj.isComputed;
	},
	DefaultMap: null
};
module.exports = types;
