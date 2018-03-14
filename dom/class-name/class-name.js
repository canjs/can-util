'use strict';

var namespace = require("can-namespace");

// From http://jaketrent.com/post/addremove-classes-raw-javascript/

var has = function(className) {
	if (this.classList) {
		return this.classList.contains(className);
	} else {
		return !!this.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
	}
};

/**
 * @module {{}} can-util/dom/class-name/class-name class-name
 * @parent can-util/dom
 * @description Allows querying and manipulation of classes on HTML elements
 *
 * ```js
 * var className = require("can-util/dom/class-name/class-name");
 *
 * var fooDiv = document.createElement("div");
 * className.add(fooDiv, "foo");
 * fooDiv.outerHTML; //-> '<div class="foo"></div>'
 * ```
 */
module.exports = namespace.className = {
	/**
	 * @function can-util/dom/class-name/class-name.has className.has
	 * @parent can-util/dom/class-name/class-name
   * @signature `className.has.call(el, cls)`
	 *
	 * Determine wheter a DOM node has a given class name.
	 *
	 * ```js
	 * var className = require("can-util/dom/class-name/class-name");
	 *
	 * var isContainer = className.has.call(el, "container");
	 * ```
	 *
	 * @param {String} className A string representing a single class name token
	 *
	 * @return {Boolean} true if the element's class attribute contains the token, false otherwise.
	 */
	has: has,
	/**
	 * @function can-util/dom/class-name/class-name.add className.add
	 * @parent can-util/dom/class-name/class-name
	 * @signature `className.add.call(el, cls)`
	 *
	 * Add a class name to a DOM node if it is not already there.
	 *
	 * ```js
	 * var className = require("can-util/dom/class-name/class-name");
	 *
	 * className.add.call(el, "container");
	 * ```
	 *
	 * @param {String} className A string representing a single class name token
	 *
	 * @return {void}
	 */
	add: function(className) {
		if (this.classList) {
			this.classList.add(className);
		}
		else if (!has.call(this, className)) {
			this.className += " " + className;
		}
	},
	/**
	 * @function can-util/dom/class-name/class-name.remove className.remove
	 * @parent can-util/dom/class-name/class-name
	 * @signature `className.remove.call(el, cls)`
	 *
	 * Remove a class name from a DOM node if it exists on the node
	 *
	 * ```js
	 * var className = require("can-util/dom/class-name/class-name");
	 *
	 * className.remove.call(el, "container");
	 * ```
	 *
	 * @param {String} className A string representing a single class name token
	 *
	 * @return {void}
	 */
	remove: function(className) {
		if (this.classList) {
			this.classList.remove(className);
		} else if (has.call(this, className)) {
			var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
			this.className = this.className.replace(reg, ' ');
		}
	}
};
