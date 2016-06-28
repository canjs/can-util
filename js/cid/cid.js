/**
 * @module {function} can-util/js/cid/cid cid
 * @parent can-util/js
 * @signature `cid(object, optionalObjectType)`
 *
 * Get a unique identifier for the object, optionally prefixed by a type name.
 *
 * Once set, the unique identifier does not change, even if the type name
 * changes on subsequent calls.
 *
 * ```js
 * var cid = require("can-util/js/cid/cid");
 * var x = {};
 * var y = {};
 * 
 * console.log(cid(x, "demo")); // -> "demo1"
 * console.log(cid(x, "prod")); // -> "demo1"
 * console.log(cid(y));         // -> "2"
 * ```
 *
 * @param {Object} object The object to uniquely identify.
 * @param {String} name   An optional type name with which to prefix the identifier 
 *
 * @return {String} Returns the unique identifier
 */
var cid = 0;
module.exports = function (object, name) {
	if (!object._cid) {
		cid++;
		object._cid = (name || '') + cid;
	}
	return object._cid;
};
