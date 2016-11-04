var GLOBAL = require("can-util/js/global/global");
var each = require("can-util/js/each/each");
var CID = require("can-util/js/cid/cid");
var domData = require("can-util/dom/data/data");

var CIDSet;

var getCID = function(obj){
	if(typeof obj.nodeType === "number") {
		return domData.cid.call(obj);
	} else {
		return CID(obj);
	}
};

if(GLOBAL().Set) {
	CIDSet = GLOBAL().Set;
} else {
	var CIDSet = function(){
		this.values = {};
	};
	CIDSet.prototype.add = function(value){
		this.values[getCID(value)] = value;
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
	CIDSet.prototype.has = function(value) {
		return this.values[getCID(value)];
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
