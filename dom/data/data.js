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
 * @module {{}} can-util/dom/data/data
 * @parent can-util/dom
 * @description Allows associating data as a key/value pair for a particular
 * DOM Node.
 *
 * ```js
 * var domData = require("can-util/dom/data/data");
 * ```
 */
module.exports = {
	getCid: function(){
		return this[expando];
	},
	cid: function(){
		return this[expando] || (this[expando] = ++uuid);
	},
	expando: expando,
	clean: function(prop) {
		var id = this[expando];
		delete data[id][prop];
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
