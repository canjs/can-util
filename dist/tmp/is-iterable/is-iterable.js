import types from "can-types";

let _moduleExports;

export default _moduleExports;


_moduleExports = function (obj) {
	return obj && !!obj[types.iterator];
};