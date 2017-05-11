'use strict';

var GLOBAL = require("../global/global");
var each = require("../each/each");
var getCID = require("../cid/get-cid");

var CIDMap;

if(GLOBAL().Map) {
	CIDMap = GLOBAL().Map;
} else {
	var CIDMap = function(){
		this.values = {};
	};
	CIDMap.prototype.set = function(key, value){
		this.values[getCID(key)] = {key: key, value: value};
	};
	CIDMap.prototype["delete"] = function(key){
		var has = getCID(key) in this.values;
		if(has) {
			delete this.values[getCID(key)];
		}
		return has;
	};
	CIDMap.prototype.forEach = function(cb, thisArg) {
		each(this.values, function(pair){
			return cb.call(thisArg || this, pair.value, pair.key, this);
		}, this);
	};
	CIDMap.prototype.has = function(key) {
		return getCID(key) in this.values;
	};
	CIDMap.prototype.get = function(key) {
		var obj = this.values[getCID(key)];
		return obj && obj.value;
	};
	CIDMap.prototype.clear = function(key) {
		return this.values = {};
	};
	Object.defineProperty(CIDMap.prototype,"size",{
		get: function(){
			var size = 0;
			each(this.values, function(){
				size++;
			});
			return size;
		}
	});
}

module.exports = CIDMap;
