import CID from "../../node_modules/can-cid/can-cid.js";
import domDataCore from "../../dom/data/core.js";

let _moduleExports;

export default _moduleExports;

_moduleExports = function (obj) {
	if (typeof obj.nodeType === "number") {
		return domDataCore.cid.call(obj);
	} else {
		var type = typeof obj;
		var isObject = type !== null && (type === "object" || type === "function");
		return type + ":" + (isObject ? CID(obj) : obj);
	}
};