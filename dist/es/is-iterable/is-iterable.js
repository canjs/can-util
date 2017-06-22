import types from "../../node_modules/can-types/can-types.js";

let _moduleExports;

export default _moduleExports;

_moduleExports = function (obj) {
	return obj && !!obj[types.iterator];
};