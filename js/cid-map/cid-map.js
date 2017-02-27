var GLOBAL = require("../global/global");
var each = require("../each/each");
var getCID = require("../cid/get-cid");

var CIDSet;

if(GLOBAL().Map) {
	CIDSet = GLOBAL().Map;
} else {
	var CIDSet = function(){
		this.values = {};
	};
	CIDSet.prototype.set = function(key, value){
		this.values[getCID(key)] = {key: key, value: value};
	};
	CIDSet.prototype["delete"] = function(key){
		var has = getCID(key) in this.values;
		if(has) {
			delete this.values[getCID(key)];
		}
		return has;
	};
	CIDSet.prototype.forEach = function(cb, thisArg) {
		each(this.values, function(pair){
			return cb.call(thisArg || this, pair.value, pair.key, this);
		}, this);
	};
	CIDSet.prototype.has = function(key) {
		return getCID(key) in this.values;
	};
	CIDSet.prototype.get = function(key) {
		return this.values[getCID(key)].value;
	};
	CIDSet.prototype.clear = function(key) {
		return this.values = {};
	};
	Object.defineProperty(CIDSet.prototype,"size",{
		get: function(){
			var size = 0;
			each(this.values, function(){
				size++;
			});
			return size;
		}
	});
}

module.exports = CIDSet;
