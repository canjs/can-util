// # can/util/inserted
// Used to alert interested parties of when an element is inserted into the DOM.
// Given a list of elements, check if the first is in the DOM, and if so triggers the `inserted` event on all elements and their descendants.

var makeArray = require("../../js/make-array/");
var setImmediate = require("../../js/set-immediate/");

var getMutationObserver = require("../mutation-observer/");
var childNodes = require("../child-nodes/");
var domContains = require("../contains/");
var domDispatch = require("../dispatch/");

var mutatedElements;
var mutated = function(elements, type) {
	if(!getMutationObserver()) {
		if(!mutatedElements) {
			mutatedElements = [];
			setImmediate(fireMutations);
		}
		mutatedElements.push([type, elements]);
	}
};

var checks = {
	inserted: function(root, elem){
		return domContains.call(root, elem);
	},
	removed: function(root, elem){
		return !domContains.call(root, elem);
	}
};


var fireMutations = function(){
	var mutations = mutatedElements;
	mutatedElements = null;
	var firstElement = mutations[0][1][0];
	var doc = firstElement.ownerDocument || firstElement;
	var root = root = doc.contains ? doc : doc.body;
	mutations.forEach(function(mutation){
		fireOn(mutation[1], root, checks[mutation[0]], mutation[0])
	});
};

var fireOn = function(elems, root, check, event) {
	if (!elems.length) {
		return;
	}
	var children;

	// Go through `elems` and trigger the `inserted` event.
	// If the first element is not in the document (a Document Fragment) it will exit the function.
	// If it is in the document it sets the `inDocument` flag to true. This means that we only check
	// for the first element and either exit the function or start triggering "inserted" for child elements.
	for (var i = 0, elem; (elem = elems[i]) !== undefined; i++) {

		// If we've found an element in the document then we can now trigger **"inserted"** for `elem` and all of its children. We are using `getElementsByTagName("*")` so that we grab all of the descendant nodes.
		if (elem.getElementsByTagName && check(root, elem) ) {
			children = makeArray(elem.getElementsByTagName("*"));
			domDispatch.call(elem, event, [], false);
			for (var j = 0, child;
				(child = children[j]) !== undefined; j++) {
				domDispatch.call(child, event, [], false);
			}
		}
	}
};


module.exports = {
	// ## can.appendChild
	// Used to append a node to an element and trigger the "inserted" event on all of the newly inserted children. Since `can.inserted` takes an array we convert the child to an array, or in the case of a DocumentFragment we first convert the childNodes to an array and call inserted on those.
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
	// ## can.insertBefore
	// Like can.appendChild, used to insert a node to an element before a reference node and then trigger the "inserted" event.
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
	removeChild: function(child){
		if(getMutationObserver()) {
			this.removeChild(child);
		} else {
			this.removeChild(child);
			mutated([child],"removed");
		}
	},
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
			this.replaceChild(newChild, oldChild);
			mutated([oldChild],"removed");
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
