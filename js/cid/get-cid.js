'use strict';

var CID = require("can-cid");
var domDataCore = require("../../dom/data/core");

module.exports = function(obj){
	if(typeof obj.nodeType === "number") {
		return domDataCore.cid.call(obj);
	} else {
		var type = typeof obj;
		var isObject = type !== null && (type === "object" || type === "function");
		return type+":"+( isObject ? CID(obj) : obj );
	}
};
