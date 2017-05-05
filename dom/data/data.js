'use strict';

var domDataCore = require("./core");
var mutationDocument = require("../mutation-observer/document/document");

var deleteNode = function() {
	return domDataCore.delete.call(this);
};

// count of distinct elements that have domData set
var elementSetCount = 0;

var cleanupDomData = function(node) {
	// decrement count if node was deleted
	elementSetCount -= deleteNode.call(node) ? 1 : 0;

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
module.exports = {
	/**
	 * @function can-util/dom/data/data.getCid domData.getCid
	 * @signature `domData.getCid.call(el)`
	 * @return {Number} The value of the element's unique CID
	 *
	 * Return the previously set unique identifier for the dom node.
	 */
	getCid: domDataCore.getCid,
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
	cid: domDataCore.cid,
	/**
	 * @property can-util/dom/data/data.expando domData.expando
	 * @type {String}
	 *
	 * The key in which elements' cids are stored
	 */
	expando: domDataCore.expando,
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
	clean: domDataCore.clean,
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
	get: domDataCore.get,
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
		// increment elementSetCount if set returns true
		elementSetCount += domDataCore.set.call(this, name, value) ? 1 : 0;
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
	delete: deleteNode
};

