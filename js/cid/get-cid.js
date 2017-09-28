'use strict';

var CID = require("can-cid");
var domDataState = require("can-dom-data-state");

module.exports = function(obj){
	if(typeof obj.nodeType === "number") {
		return domDataState.cid.call(obj);
	} else {
		var type = typeof obj;
		var isObject = type !== null && (type === "object" || type === "function");
		return type+":"+( isObject ? CID(obj) : obj );
	}
};
