'use strict';

var global = require("../../js/global/global");

/**
 * @module {function} can-util/dom/document/document document
 * @parent can-util/dom
 * @signature `document(document)`
 *
 * @param {Object} document An optional document-like object 
 * to set as the context's document
 *
 * Optionally sets, and returns, the document object for the context.
 *
 * ```js
 * var documentShim = { getElementById() {...} };
 * var domDocument = require("can-util/dom/document/document");
 * domDocument(documentShim);
 *
 * ...
 *
 * domDocument().getElementById("foo");
 * ```
 */
var setDocument;
module.exports = function(setDoc){
	if(setDoc) {
		setDocument = setDoc;
	}
	return setDocument || global().document;
};
