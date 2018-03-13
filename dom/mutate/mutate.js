'use strict';

// # can/util/inserted
// Used to alert interested parties of when an element is inserted into the DOM.
// Given a list of elements, check if the first is in the DOM, and if so triggers the `inserted` event on all elements and their descendants.

var makeArray = require("../../js/make-array/make-array");
var namespace = require("can-namespace");
var setImmediate = require("../../js/set-immediate/set-immediate");
var CID = require("can-cid");

var getMutationObserver = require("can-globals/mutation-observer/mutation-observer");
var childNodes = require("../child-nodes/child-nodes");
var domContains = require("../contains/contains");
var domDispatch = require("../dispatch/dispatch");
var getDocument = require('can-globals/document/document');
var domData = require("../data/data");

var mutatedElements;
var checks = {
	inserted: function(root, elem){
		return domContains.call(root, elem);
	},
	removed: function(root, elem){
		return !domContains.call(root, elem);
	}
};

var fireOn = function(elems, root, check, event, dispatched) {
	if (!elems.length) {
		return;
	}
	var children, cid;

	// Go through `elems` and trigger the `inserted` event.
	// If the first element is not in the document (a Document Fragment) it will exit the function.
	// If it is in the document it sets the `inDocument` flag to true. This means that we only check
	// for the first element and either exit the function or start triggering "inserted" for child elements.
	for (var i = 0, elem; (elem = elems[i]) !== undefined; i++) {
		cid = CID(elem);
		// If we've found an element in the document then we can now trigger **"inserted"** for `elem` and all of its children. We are using `getElementsByTagName("*")` so that we grab all of the descendant nodes.
		if (elem.getElementsByTagName && check(root, elem) && !dispatched[cid]) {
			// mark as being dispatched
			dispatched[cid] = true;
			children = makeArray(elem.getElementsByTagName("*"));
			domDispatch.call(elem, event, [], false);
			if (event === "removed") {
				domData.delete.call(elem);
			}

			for (var j = 0, child;
				(child = children[j]) !== undefined; j++) {
				// fire the event only if this hasn't already been fired on.
				cid = CID(child);
				if(!dispatched[cid]) {
					domDispatch.call(child, event, [], false);
					// jshint maxdepth:5
					if (event === "removed") {
						domData.delete.call(child);
					}
					dispatched[cid] = true;
				}
			}
		}
	}
};
//
var fireMutations = function(){
	var mutations = mutatedElements;
	mutatedElements = null;

	var firstElement = mutations[0][1][0];
	var doc = getDocument() || firstElement.ownerDocument || firstElement;
	var root = doc.contains ? doc : doc.documentElement;
	var dispatched = {inserted: {}, removed: {}};
	mutations.forEach(function(mutation){
		fireOn(mutation[1], root, checks[mutation[0]], mutation[0], dispatched[mutation[0]]);
	});
};
var mutated = function(elements, type) {
	if(!getMutationObserver() && elements.length) {
		// make sure this element is in the page (mutated called before something is removed)
		var firstElement = elements[0];
		var doc = getDocument() || firstElement.ownerDocument || firstElement;
		var root = doc.contains ? doc : doc.documentElement;
		if( checks.inserted(root, firstElement) ) {

			// if it is, schedule a mutation fire
			if(!mutatedElements) {
				mutatedElements = [];
				setImmediate(fireMutations);
			}
			mutatedElements.push([type, elements]);
		}
	}
};

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
module.exports = namespace.mutate = {
	/**
	 * @function can-util/dom/mutate/mutate.appendChild appendChild
	 * @signature `mutate.appendChild.call(el, child)`
	 * Used to append a node to an element and trigger the "inserted" event on all of the newly inserted children. Since `mutated` takes an array we convert the child to an array, or in the case of a DocumentFragment we first convert the childNodes to an array and call inserted on those.
	 */
	appendChild: function(child) {
		if(getMutationObserver()) {
			this.appendChild(child);
		} else {
			var children;
			if (child.nodeType === 11) {
				children = makeArray(childNodes(child));
			} else {
				children = [child];
			}
			this.appendChild(child);
			mutated(children,"inserted");
		}
	},
	/**
	 * @function can-util/dom/mutate/mutate.insertBefore insertBefore
	 * @signature `mutate.insertBefore.call(el, ref, child)`
	 * Like mutate.appendChild, used to insert a node to an element before a reference node and then trigger the "inserted" event.
	 */
	insertBefore: function(child, ref, document) {
		if(getMutationObserver()) {
			this.insertBefore(child, ref);
		} else {
			var children;
			if (child.nodeType === 11) {
				children = makeArray(childNodes(child));
			} else {
				children = [child];
			}
			this.insertBefore(child, ref);
			mutated(children,"inserted");
		}
	},
	/**
	 * @function can-util/dom/mutate/mutate.removeChild removeChild
	 * @signature `mutate.removeChild.call(el, child)`
	 * Like mutate.appendChild, used to insert a node to an element before a reference node and then trigger the "removed" event.
	 */
	removeChild: function(child){
		if(getMutationObserver()) {
			this.removeChild(child);
		} else {
			mutated([child],"removed");
			this.removeChild(child);
		}
	},
	/**
	 * @function can-util/dom/mutate/mutate.replaceChild replaceChild
	 * @signature `mutate.replaceChild.call(el, child)`
	 * Like mutate.appendChild and mutate.removeChild, used to replace a node with another node and trigger "removed" on the removed element and "inserted" on the inserted elements.
	 */
	replaceChild: function(newChild, oldChild){
		if(getMutationObserver()) {
			this.replaceChild(newChild, oldChild);
		} else {
			var children;
			if (newChild.nodeType === 11) {
				children = makeArray(childNodes(newChild));
			} else {
				children = [newChild];
			}
			mutated([oldChild],"removed");
			this.replaceChild(newChild, oldChild);
			mutated(children,"inserted");
		}
	},
	// called with elements that might have been inserted
	inserted: function(elements){
		mutated(elements,"inserted");
	},
	// called with elements that have been removed
	removed: function(elements){
		mutated(elements,"removed");
	}
};
