var CID = require("can-cid");
var domData = require("../../dom/data/data");

module.exports = function(obj){
	if(typeof obj.nodeType === "number") {
		return domData.cid.call(obj);
	} else {
		var type = typeof obj;
		var isObject = type !== null && (type === "object" || type === "function");
		return type+":"+( isObject ? CID(obj) : obj );
	}
};
