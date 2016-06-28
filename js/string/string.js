var isArray = require('../is-array/is-array');

// ##string.js
// _Miscellaneous string utility functions._
// Several of the methods in this plugin use code adapated from Prototype
// Prototype JavaScript framework, version 1.6.0.1.
// © 2005-2007 Sam Stephenson
/**
 * @module {{}} can-util/js/string/string string
 * @parent can-util/js
 *
 * @description  String utilities used by CanJS libraries
 */
var strUndHash = /_|-/,
	strColons = /\=\=/,
	strWords = /([A-Z]+)([A-Z][a-z])/g,
	strLowUp = /([a-z\d])([A-Z])/g,
	strDash = /([a-z\d])([A-Z])/g,
	strReplacer = /\{([^\}]+)\}/g,
	strQuote = /"/g,
	strSingleQuote = /'/g,
	strHyphenMatch = /-+(.)?/g,
	strCamelMatch = /[a-z][A-Z]/g,
	// Returns the `prop` property from `obj`.
	// If `add` is true and `prop` doesn't exist in `obj`, create it as an
	// empty object.
	getNext = function (obj, prop, add) {
		var result = obj[prop];
		if (result === undefined && add === true) {
			result = obj[prop] = {};
		}
		return result;
	},
	// Returns `true` if the object can have properties (no `null`s).
	isContainer = function (current) {
		return /^f|^o/.test(typeof current);
	}, convertBadValues = function (content) {
		// Convert bad values into empty strings
		var isInvalid = content === null || content === undefined || isNaN(content) && '' + content === 'NaN';
		return '' + (isInvalid ? '' : content);
	};

var string = {
	/**
	 * @function can-util/js/string/string.esc string.esc
	 * @signature `string.esc(content)`
	 * @param  {String} content a string
	 * @return {String}         the string safely HTML-escaped
	 */
	esc: function (content) {
		return convertBadValues(content)
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(strQuote, '&#34;')
			.replace(strSingleQuote, '&#39;');
	},
	/**
	 * @function can-util/js/string/string.getObject string.getObject
	 * @signature `string.getObject(name, roots, add)`
	 * @param  {String} name  a String of dot-separated keys, representing a path of properties
	 * @param  {Object|Array} roots the object to use as the root for property based navigation
	 * @param  {Boolean} add  if true, add the parts at each step as new objects
	 * @return {*}       the value at the property path descending from `roots`
	 *
	 * Return the result of descending the path `name` through the properties of the object or objects
	 * `roots`
	 * 
	 * If `roots` is an Array, each element of the array is evaluated, in order, until
	 * the path is found in an element's properties (and properties-of-properties, etc.).  Otherwise
	 * `roots` is evaluated as the root object, returning either the object at the property path
	 * descended from `roots` or `undefined` if any subpath is not found.
	 *
	 * A *path* is a dot-delimited sequence of zero or more property names, such that "foo.bar" means "the property
	 * 'bar' of the object at the property 'foo' of the root."  An empty path returns the first object in `roots`
	 * if it's an array, `roots` itself otherwise.
	 *
	 * If `add` is `true` and `path` is not found in any roots, a matching path that resolves to an empty object
	 * is added to the first object in `roots` if `roots` is an array, `roots` itself otherwise.
	 * 
	 * ```js
	 * var string = require("can-util/js/string/string");
	 * console.log(string.getObject("a.b.c", {a: {b: {c: "foo"}}})); // -> "foo"
	 * console.log(string.getObject("a.b.c", {a: {}})); // -> undefined
	 * console.log(string.getObject("a.b", [{a: {}}, {a: {b: "bar"}}])); // -> "bar"
	 * ```
	 */
	getObject: function (name, roots, add) {
		// The parts of the name we are looking up
		// `['App','Models','Recipe']`
		var parts = name ? name.split('.') : [],
			length = parts.length,
			current, r = 0,
			i, container, rootsLength;
		// Make sure roots is an `array`.
		roots = isArray(roots) ? roots : [roots || window];
		rootsLength = roots.length;
		if (!length) {
			return roots[0];
		}
		// For each root, mark it as current.
		for (r; r < rootsLength; r++) {
			current = roots[r];
			container = undefined;
			// Walk current to the 2nd to last object or until there
			// is not a container.
			for (i = 0; i < length && isContainer(current); i++) {
				container = current;
				current = getNext(container, parts[i]);
			}
			// If we found property break cycle
			if (container !== undefined && current !== undefined) {
				break;
			}
		}
		// Remove property from found container
		if (add === false && current !== undefined) {
			delete container[parts[i - 1]];
		}
		// When adding property add it to the first root
		if (add === true && current === undefined) {
			current = roots[0];
			for (i = 0; i < length && isContainer(current); i++) {
				current = getNext(current, parts[i], true);
			}
		}
		return current;
	},
	/**
	 * @function can-util/js/string/string.capitalize string.capitalize
	 * @signature `string.capitalize(s)`
	 * @param  {String} s     the string to capitalize
	 * @return {String}       the supplied string with the first character uppercased if it is a letter
	 *
	 * ```js
	 * var string = require("can-util/js/string/string");
	 * 
	 * console.log(string.capitalize("foo")); // -> "Foo"
	 * console.log(string.capitalize("123")); // -> "123"
	 * ```
	 */
	capitalize: function (s, cache) {
		// Used to make newId.
		return s.charAt(0)
			.toUpperCase() + s.slice(1);
	},
	/**
	 * @function can-util/js/string/string.camelize string.camelize
	 * @signature `string.camelize(s)`
	 * @param  {String} str   the string to camelCase
	 * @return {String}       the supplied string with hyphens removed and following letters capitalized.
	 *
	 * ```js
	 * var string = require("can-util/js/string/string");
	 * 
	 * console.log(string.camelize("foo-bar")); // -> "fooBar"
	 * console.log(string.camelize("-webkit-flex-flow")); // -> "WebkitFlexFlow"
	 * ```
	 */
	camelize: function (str) {
		return convertBadValues(str)
			.replace(strHyphenMatch, function (match, chr) {
				return chr ? chr.toUpperCase() : '';
			});
	},
	/**
	 * @function can-util/js/string/string.hyphenate string.hyphenate
	 * @signature `string.hyphenate(s)`
	 * @param  {String} str   a string in camelCase
	 * @return {String}       the supplied string with camelCase converted to hyphen-lowercase digraphs
	 *
	 * ```js
	 * var string = require("can-util/js/string/string");
	 * 
	 * console.log(string.hyphenate("fooBar")); // -> "foo-bar"
	 * console.log(string.hyphenate("WebkitFlexFlow")); // -> "Webkit-flex-flow"
	 * ```
	 */
	hyphenate: function (str) {
		return convertBadValues(str)
			.replace(strCamelMatch, function (str, offset) {
				return str.charAt(0) + '-' + str.charAt(1)
					.toLowerCase();
			});
	},
	/**
	 * @function can-util/js/string/string.underscore string.underscore
	 * @signature `string.underscore(s)`
	 * @param  {String} str   a string in camelCase
	 * @return {String}       the supplied string with camelCase converted to underscore-lowercase digraphs
	 *
	 * ```js
	 * var string = require("can-util/js/string/string");
	 * 
	 * console.log(string.underscore("fooBar")); // -> "foo_bar"
	 * console.log(string.underscore("HTMLElement")); // -> "html_element"
	 * ```
	 */
	underscore: function (s) {
		return s.replace(strColons, '/')
			.replace(strWords, '$1_$2')
			.replace(strLowUp, '$1_$2')
			.replace(strDash, '_')
			.toLowerCase();
	},
	/**
	 * @function can-util/js/string/string.sub string.sub
	 * @signature `string.sub(str, data, remove)`
	 * @param {String} str   a string with {curly brace} delimited property names
	 * @param {Object} data  an object from which to read properties
	 * @return {String|null} the supplied string with delimited properties replaced with their values
	 *                       if all properties exist on the object, null otherwise
	 *
	 * If `remove` is true, the properties found in delimiters in `str` are removed from `data`.
	 * 
	 * ```js
	 * var string = require("can-util/js/string/string");
	 * 
	 * console.log(string.sub("foo_{bar}", {bar: "baz"}})); // -> "foo_baz"
	 * console.log(string.sub("foo_{bar}", {})); // -> null
	 * ```
	 */
	sub: function (str, data, remove) {
		var obs = [];
		str = str || '';
		obs.push(str.replace(strReplacer, function (whole, inside) {
			// Convert inside to type.
			var ob = string.getObject(inside, data, remove === true ? false : undefined);
			if (ob === undefined || ob === null) {
				obs = null;
				return '';
			}
			// If a container, push into objs (which will return objects found).
			if (isContainer(ob) && obs) {
				obs.push(ob);
				return '';
			}
			return '' + ob;
		}));
		return obs === null ? obs : obs.length <= 1 ? obs[0] : obs;
	},
	/**
	 * @property {RegExp} can-util/js/string/string.strReplacer string.strReplacer
	 *
	 * The regex used to find replacement sections in [can-util/js/string/string.sub string.sub]
	 */
	replacer: strReplacer,
	/**
	 * @property {RegExp} can-util/js/string/string.strUndHash string.strUndHash
	 *
	 * A regex which matches an underscore or hyphen character
	 */
	undHash: strUndHash
};
module.exports = string;
