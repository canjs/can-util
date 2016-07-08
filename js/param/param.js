var isArray = require('../is-array/is-array');

/**
 * @module {function} can-util/js/param/param param
 * @parent can-util/js
 * @signature `param(object)`
 *
 * @param {Object} object an object of key-value pairs to serialize
 * @return {String} The params formatted into an form-encoded string
 * 
 * Takes an Object of name value pairs and returns a String with the parameters encoded.
 *
 * ```js
 * var deparam = require("can-util/js/param/param");
 * 
 * console.log(param({foo: "bar"})); // -> "foo=bar"
 * console.log(param({foo: ["bar", "baz"]})); // -> "foo[]=bar&foo[]=baz"
 * console.log(param({foo: {bar: "baz"})); // -> "foo[bar]=baz"
 * console.log(param({foo: "bar & baz"})); // -> "foo=bar%20%26%20baz"
 * ```
 */
function buildParam(prefix, obj, add) {
	if (isArray(obj)) {
		for (var i = 0, l = obj.length; i < l; ++i) {
			add(prefix + '[]', obj[i]);
		}
	} else if ( obj && typeof obj === "object" ) {
		for (var name in obj) {
			buildParam(prefix + '[' + name + ']', obj[name], add);
		}
	} else {
		add(prefix, obj);
	}
}
/**
 * @module {function} can-util/js/param/param
 * @parent can-util/js
 *
 * Serialize an object into a query string.
 *
 * @signature `param(params)`
 *
 *   Serializes an object or array into a query string useful for making Ajax requests or the
 *   browser. `param` handles nested objects and arrays.  It uses `encodeURIComponent` to
 *   escape values and keys.
 *
 *   ```js
 *   param({a: "b", c: "d"}) //-> "a=b&c=d"
 *   param({a: ["X","Y"]})   //-> "a[]=X&a[]=Y"
 *   ```
 *
 *   @param  {Object} params [description]
 *   @return {String}        [description]
 */
module.exports = function param(object) {
	var pairs = [],
		add = function (key, value) {
			pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
		};
	for (var name in object) {
		buildParam(name, object[name], add);
	}
	return pairs.join('&')
		.replace(/%20/g, '+');
};
