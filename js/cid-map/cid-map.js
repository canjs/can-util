var GLOBAL = require("../global/global");
var each = require("../each/each");
var CID = require("can-cid");
var domData = require("../../dom/data/data");

var CIDSet;

var getCID = function(obj){
	if(typeof obj.nodeType === "number") {
		return domData.cid.call(obj);
	} else {
		return CID(obj);
	}
};

if(GLOBAL().Map) {
	CIDSet = GLOBAL().Map;
} else {
	var CIDSet = function(){
		this.values = {};
	};
	CIDSet.prototype.set = function(key, value){
		this.values[getCID(key)] = value;
	};
	CIDSet.prototype["delete"] = function(key){
		var has = getCID(key) in this.values;
		if(has) {
			delete this.values[getCID(key)];
		}
		return has;
	};
	CIDSet.prototype.forEach = function(cb, thisArg) {
		each(this.values, cb, thisArg);
	};
	CIDSet.prototype.has = function(key) {
		return getCID(key) in this.values;
	};
	CIDSet.prototype.get = function(key) {
		return this.values[getCID(key)];
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
