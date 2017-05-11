'use strict';

var GLOBAL = require("../global/global");
var each = require("../each/each");
var getCID = require("../cid/get-cid");

var CIDSet;

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
		return (getCID(value) in this.values);
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
