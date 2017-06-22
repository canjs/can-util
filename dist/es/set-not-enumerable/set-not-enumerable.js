let _moduleExports;

export default _moduleExports;

_moduleExports = function (obj, prop, value) {
	Object.defineProperty(obj, prop, {
		configurable: true,
		enumerable: false,
		writable: true,
		value: value
	});
};