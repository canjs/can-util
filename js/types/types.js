/**
 * @module {Object} can-util/js/types/types
 * @parent can-util/js
 * @description A stateful container for CanJS type information.
 *
 * @body
 *
 * ## Use
 *
 * `can-util/js/types/types` exports an object with placeholder functions that
 * can be used to provide default types or test if something is of a certain type.
 *
 * This is where the sausage of loose coupling modules takes place.
 * Modules that provide a type will overwrite one or multiple of these functions so
 * they take into account the new type.
 *
 * For example, `can-define/map/map` might overwrite `isMapLike` to return true
 * if the object is an instance of Map:
 *
 * ```js
 * var types = require("can-util/js/types/types");
 * var oldIsMapLike = types.isMapLike;
 * types.isMapLike = function(obj){
 *   return obj instanceof DefineMap || oldIsMapLike.apply(this, arguments);
 * };
 * types.DefaultMap = DefineMap;
 * ```
 */

var isPromise = require('../is-promise/is-promise');

var types = {
	/**
	 * @function can-util/js/types/types.isMapLike isMapLike
	 * @signature `types.isMapLike(obj)`
	 *   Returns true if `obj` is an observable key-value pair type object.
	 *
	 * @return {Boolean} `true` if the object is map like.
	 */
	isMapLike: function(){
		return false;
	},
	/**
	 * @function can-util/js/types/types.isListLike isListLike
	 * @signature `types.isListLike(obj)`
	 *   Returns true if `obj` is an observable list-type object with numeric keys and a length.
	 *
	 * @return {Boolean} `true` if the object is list like.
	 */
	isListLike: function(){
		return false;
	},
	/**
	 * @function can-util/js/types/types.isPromise isPromise
	 * @signature `types.isPromise(obj)`
	 *   Returns true if `obj` is a Promise.
	 *
	 * @return {Boolean} `true` if the object is a Promise.
	 */
	isPromise: function(obj){
		return isPromise(obj);
	},
	/**
	 * @function can-util/js/types/types.isConstructor isConstructor
	 * @signature `types.isConstructor(obj)`
	 *   Returns true if `obj` looks like a constructor function to be called with `new`.
	 *
	 * @return {Boolean} `true` if the object is a constructor function.
	 */
	isConstructor: function(func){
		/* jshint unused: false */
		if(typeof func !== "function") {
			return false;
		}
		// if there are any properties on the prototype, assume it's a constructor
		for(var prop  in func.prototype) {
			return true;
		}
		// We could also check if something is returned, if it is, probably not a constructor.
		return false;
	},
	/**
	 * @function can-util/js/types/types.isCallableForValue isCallableForValue
	 * @signature `types.isConstructor(obj)`
	 *   Returns true if `obj` looks like a function that should be read to get a value.
	 *
	 * @return {Boolean} `true` if the object should be called for a value.
	 */
	isCallableForValue: function(obj){
		return typeof obj === "function" && !types.isConstructor(obj);
	},
	/**
	 * @function can-util/js/types/types.isCompute isCompute
	 * @signature `types.isCompute(obj)`
	 *   Returns true if `obj` is a [can-compute].
	 *
	 * @return {Boolean} `true` if the object is a [can-compute].
	 */
	isCompute: function(obj){
		return obj && obj.isComputed;
	},
	/**
	 * @property {Symbol} can-util/js/types/types.iterator iterator
	 * @option {Symbol}
	 *
	 * Used to implement an iterable object that can be used with [can-util/js/each/each]. In browsers that support for/of this will be Symbol.iterator; in older browsers it will be a string, but is still useful with [can-util/js/each/each].
	 */
	iterator: (typeof Symbol === "function" && Symbol.iterator) || "@@iterator",
	/**
	 * @property {Map} can-util/js/types/types.DefaultMap DefaultMap
	 *
	 * @option {Map}
	 *
	 *   The default map type to create if a map is needed.  If both [can-map] and [can-define/map/map]
	 *   are imported, the default type will be [can-define/map/map].
	 */
	DefaultMap: null,
	/**
	 * @property {can-connect.List} can-util/js/types/types.DefaultList DefaultList
	 *
	 * @option {can-connect.List}
	 *
	 *   The default list type to create if a list is needed. If both [can-list] and [can-define/list/list]
	 *   are imported, the default type will be [can-define/list/list].
	 */
	DefaultList: null,
	/**
	 * @function can-util/js/types/types.wrapElement wrapElement
	 * @signature `types.wrapElement(element)`
	 *   Wraps an element into an object useful by DOM libraries ala jQuery.
	 *
	 *   @param {Node} element Any object inheriting from the [Node interface](https://developer.mozilla.org/en-US/docs/Web/API/Node).
	 *   @return {{}} A wrapped object.
	 */
	/**
	 * @function can-util/js/types/types.queueTask queueTask
	 * @signature `types.queueTask(task)`
	 *   Run code that will be queued at the end of the current batch.
	 *   @param {Array} task
	 */
	queueTask: function(task){
		var args = task[2] || [];
		task[0].apply(task[1], args);
	},
	wrapElement: function(element){
		return element;
	},
	/**
	 * @function can-util/js/types/types.unwrapElement unwrapElement
	 * @signature `types.unwrapElement(object)`
	 *   Unwraps an object that contains an element within.
	 *
	 *   @param {{}} object Any object that can be unwrapped into a Node.
	 *   @return {Node} A Node.
	 */
	unwrapElement: function(element){
		return element;
	}
};
module.exports = types;
