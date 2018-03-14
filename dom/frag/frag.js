'use strict';

var getDocument = require('can-globals/document/document');
var fragment = require('../fragment/fragment');
var each = require('../../js/each/each');
var childNodes = require('../child-nodes/child-nodes');
var namespace = require("can-namespace");

/**
@module {function} can-util/dom/frag/frag frag
@parent can-util/dom

Convert a String, HTMLElement, documentFragment, or contentArray into a documentFragment.

@signature `frag: function(item, doc)`

@param {String|HTMLElement|documentFragment|contentArray} item
@param {Document} doc   an optional DOM document in which to build the fragment

@return {documentFragment}

@body

## Use

ContentArrays can be used to combine multiple HTMLElements into a single document fragment.  For example:

    var frag = require("can-util/dom/frag/frag");

    var p = document.createElement("p");
    p.innerHTML = "Welcome to <b>CanJS</b>";
    var contentArray = ["<h1>Hi There</h1>", p];
    var fragment = frag( contentArray )

`fragment` will be a documentFragment with the following elements:

    <h1>Hi There</h1>
    <p>Welcome to <b>CanJS</b></p>

 */

var makeFrag = function(item, doc){
	var document = doc || getDocument();
	var frag;
	if(!item || typeof item === "string"){
		frag = fragment(item == null ? "" : ""+item, document);
		// If we have an empty frag...
		if (!frag.childNodes.length) {
			frag.appendChild(document.createTextNode(''));
		}
		return frag;
	} else if(item.nodeType === 11) {
		return item;
	} else if(typeof item.nodeType === "number") {
		frag = document.createDocumentFragment();
		frag.appendChild(item);
		return frag;
	} else if(typeof item.length === "number") {
		frag = document.createDocumentFragment();
		each(item, function(item){
			frag.appendChild( makeFrag(item) );
		});
		if (!childNodes(frag).length) {
			frag.appendChild(document.createTextNode(''));
		}
		return frag;
	} else {
		frag = fragment( ""+item, document);
		// If we have an empty frag...
		if (!childNodes(frag).length) {
			frag.appendChild(document.createTextNode(''));
		}
		return frag;
	}
};

module.exports = namespace.frag = makeFrag;
