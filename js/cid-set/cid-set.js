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

if(window.Set) {
	CIDSet = window.Set;
} else {
	var CIDSet = function(){
		this.values = {};
	};
	CIDSet.prototype.add = function(value){
		this.values[getCID(value)] = value;
	};
	CIDSet.prototype["delete"] = function(value){
		delete this.values[getCID(value)];
	};
	CIDSet.prototype.forEach = function(cb) {
		each(this.values, cb);
	};
	CIDSet.prototype.has = function(value) {
		return this.values[getCID(value)];
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
