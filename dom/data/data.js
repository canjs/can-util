'use strict';

var domDataState = require("can-dom-data-state");
var mutationDocument = require("../mutation-observer/document/document");
var namespace = require("can-namespace");

// count of distinct elements that have domData set
var elementSetCount = 0;

var deleteNode = function() {
	// decrement count when node is deleted
	elementSetCount -= 1;
	return domDataState.delete.call(this);
};

var cleanupDomData = function(node) {

	if(domDataState.get.call(node) !== undefined){
		deleteNode.call(node);
	}

	// remove handler once all domData has been cleaned up
	if (elementSetCount === 0) {
		mutationDocument.offAfterRemovedNodes(cleanupDomData);
	}
};

/**
 * @module {{}} can-util/dom/data/data data
 * @parent can-util/dom
 * @description Allows associating data as a key/value pair for a particular
 * DOM Node.
 *
 * ```js
 * var domData = require("can-util/dom/data/data");
 * ```
 */
module.exports = namespace.data = {
	/**
	 * @function can-util/dom/data/data.getCid domData.getCid
	 * @signature `domData.getCid.call(el)`
	 * @return {Number} The value of the element's unique CID
	 *
	 * Return the previously set unique identifier for the dom node.
	 */
	getCid: domDataState.getCid,
	/**
	 * @function can-util/dom/data/data.cid domData.cid
	 * @signature `domData.cid.call(el)`
	 * @return {Number} The value of the element's unique CID
	 *
	 * Set a unique identifier for the dom node, using the
	 * [can-util/dom/data/data.expando expando] property.
	 *
	 * @body
	 *
	 * If a unique cid value has not yet been set for this element, set it
	 * using the [can-util/dom/data/data.expando expando] property.  Return the
	 * unique cid whether or not it is newly set
	 */
	cid: domDataState.cid,
	/**
	 * @property can-util/dom/data/data.expando domData.expando
	 * @type {String}
	 *
	 * The key in which elements' cids are stored
	 */
	expando: domDataState.expando,
	/**
	 * @function can-util/dom/data/data.clean domData.clean
	 * @param  {String} prop the property to remove from the element's data
	 * @signature `domData.clean.call(el, key)`
	 *
	 * Remove data from an element previously added by [can-util/dom/data/data.set set]
	 *
	 * ```js
	 * var domData = require("can-util/dom/data/data");
	 *
	 * domData.clean.call(el, "metadata");
	 * ```
	 */
	clean: domDataState.clean,
	/**
	 * @function can-util/dom/data/data.get domData.get
	 * @signature `domData.get.call(el, key)`
	 *
	 * Get data that was stored in a DOM Node using the specified `key`.
	 *
	 * ```js
	 * var domData = require("can-util/dom/data/data");
	 *
	 * var metadata = domData.get.call(el, "metadata");
	 * ```
	 *
	 * @param {String} key A string used as a unique key for storing data associated with this DOM Node.
	 */
	get: domDataState.get,
	/**
	 * @function can-util/dom/data/data.set domData.set
	 * @signature `domData.set.call(el, name, value)`
	 *
	 * @param {String} name the key to store the value under
	 * @param {*} value     the value to store under the key
	 *
	 * Set data to be associated with a DOM Node using the specified `key`. If data already exists for this key, it will be overwritten.
	 *
	 * ```js
	 * var domData = require("can-util/dom/data/data");
	 *
	 * domData.set.call(el, "metadata", {
	 *   foo: "bar"
	 * });
	 * ```
	 */
	set: function(name, value) {
		// set up handler to clean up domData when elements are removed
		// handler only needs to be set up the first time set is called
		if (elementSetCount === 0) {
			mutationDocument.onAfterRemovedNodes(cleanupDomData);
		}

		// increment elementSetCount if this element was not already set
		elementSetCount += domDataState.get.call(this) ? 0 : 1;

		domDataState.set.call(this, name, value);
	},
	/**
	 * @function can-util/dom/data/data.delete domData.delete
	 * @signature `domData.delete.call(el)`
	 *
	 * Remove all data for an element previously added by [can-util/dom/data/data.set set]
	 *
	 * ```js
	 * var domData = require("can-util/dom/data/data");
	 *
	 * domData.delete.call(el);
	 * ```
	 */
	delete: deleteNode,

	_getElementSetCount: function(){
		return elementSetCount;
	}
};
