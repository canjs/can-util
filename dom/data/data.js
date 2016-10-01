var isEmptyObject = require("../../js/is-empty-object/is-empty-object");
var data = {};
var expando = 'can'+new Date();
var uuid = 0;
var setData = function(name, value) {
	var id = this[expando] || (this[expando] = ++uuid),
		store = data[id] || (data[id] = {});
	if (name !== undefined) {
		store[name] = value;
	}
	return store;
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
	getCid: function(){
		return this[expando];
	},
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
	cid: function(){
		return this[expando] || (this[expando] = ++uuid);
	},
	/**
	 * @property can-util/dom/data/data.expando domData.expando
	 * @type {String}
	 * 
	 * The key in which elements' cids are stored
	 */
	expando: expando,
	/**
	 * @function can-util/dom/data/data.clean domData.clean
	 * @param  {String} prop the property to remove from the element's data
	 * @signature `domData.clean.call(el, key)`
	 * 
	 * Remove data from an element previously added by [can-util/dom/data/data.set set]
	 *
	 * ```js
	 * domData.clean.call(el, "metadata");
	 * ```
	 */
	clean: function(prop) {
		var id = this[expando];
		if (data[id] && data[id][prop]) {
			delete data[id][prop];
		}
		if(isEmptyObject(data[id])) {
			delete data[id];
		}
	},
	/**
	 * @function can-util/dom/data/data.get domData.get
	 * @signature `domData.get.call(el, key)`
	 *
	 * Get data that was stored in a DOM Node using the specified `key`.
	 *
	 * ```js
	 * var metadata = domData.get.call(el, "metadata");
	 * ```
	 *
	 * @param {String} key A string used as a unique key for storing data associated with this DOM Node.
	 */
	get: function(key){
		var id = this[expando],
			store = id && data[id];
		return key === undefined ? store || setData(this) : store && store[key];
	},
	/**
	 * @function can-util/dom/data/data.set domData.set
	 * @signature `domData.set.call(el, key, value)`
	 *
	 * @param {String} name the key to store the value under
	 * @param {*} value     the value to store under the key
	 * 
	 * Set data to be associated with a DOM Node using the specified `key`. If data already exists for this key, it will be overwritten.
	 *
	 * ```js
	 * domData.set.call(el, "metadata", {
	 *   foo: "bar"
	 * });
	 * ```
	 */
	set: setData
};
