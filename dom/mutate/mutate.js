'use strict';

// # can/util/inserted
// Used to alert interested parties of when an element is inserted into the DOM.
// Given a list of elements, check if the first is in the DOM, and if so triggers the `inserted` event on all elements and their descendants.
var node = require('can-dom-mutate/node');

/**
 * @module {{}} can-util/dom/mutate/mutate mutate
 * @parent can-util/dom
 * @description Mutate an element by appending, inserting, and removing DOM nodes. Use this so that on the server "inserted" will be fired.
 *
 * ```js
 * var mutate = require("can-util/dom/mutate/mutate");
 *
 * var el = document.createElement("div");
 *
 * el.addEventListener("inserted", function(){
 *   console.log("Inserted was fired!");
 * });
 *
 * mutate.appendChild.call(document.body, el);
 * ```
 */
module.exports = {
	/**
	 * @function can-util/dom/mutate/mutate.appendChild appendChild
	 * @signature `mutate.appendChild.call(el, child)`
	 * Used to append a node to an element and trigger the "inserted" event on all of the newly inserted children. Since `mutated` takes an array we convert the child to an array, or in the case of a DocumentFragment we first convert the childNodes to an array and call inserted on those.
	 */
	appendChild: function(child) {
		return node.appendChild.apply(this, arguments);
	},
	/**
	 * @function can-util/dom/mutate/mutate.insertBefore insertBefore
	 * @signature `mutate.insertBefore.call(el, ref, child)`
	 * Like mutate.appendChild, used to insert a node to an element before a reference node and then trigger the "inserted" event.
	 */
	insertBefore: function(child, ref, document) {
		return node.insertBefore.apply(this, arguments);
	},
	/**
	 * @function can-util/dom/mutate/mutate.removeChild removeChild
	 * @signature `mutate.removeChild.call(el, child)`
	 * Like mutate.appendChild, used to insert a node to an element before a reference node and then trigger the "removed" event.
	 */
	removeChild: function(child){
		return node.removeChild.apply(this, arguments);
	},
	/**
	 * @function can-util/dom/mutate/mutate.replaceChild replaceChild
	 * @signature `mutate.replaceChild.call(el, child)`
	 * Like mutate.appendChild and mutate.removeChild, used to replace a node with another node and trigger "removed" on the removed element and "inserted" on the inserted elements.
	 */
	replaceChild: function(newChild, oldChild){
		return node.replaceChild.apply(this, arguments);
	}
};
