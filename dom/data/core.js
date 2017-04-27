'use strict';

var isEmptyObject = require("../../js/is-empty-object/is-empty-object");

var data = {};
var expando = "can" + new Date();
var uuid = 0;

// set data for an element
// returns true if this is the first data for this element
// so that caller can track number of elements with data set
var setData = function(name, value) {
	var id = this[expando] || (this[expando] = ++uuid),
		store = data[id],
		newStore = false;

	if (!data[id]) {
		newStore = true;
		store = data[id] = {};
	}

	if (name !== undefined) {
		store[name] = value;
	}
	return newStore;
};

// delete this node's `data`
// returns true if the node was deleted.
var deleteNode = function() {
	var id = this[expando];
	var nodeDeleted = false;
	if(id && data[id]) {
		nodeDeleted = true;
		delete data[id];
	}
	return nodeDeleted;
};

/*
 * Core of domData that does not depend on mutationDocument
 * This is separated in order to prevent circular dependencies
 */
module.exports = {
	_data: data,

	getCid: function() {
		return this[expando];
	},

	cid: function(){
		return this[expando] || (this[expando] = ++uuid);
	},

	expando: expando,

	get: function(key) {
		var id = this[expando],
			store = id && data[id];
		return key === undefined ? store || setData(this) : store && store[key];
	},

	set: setData,

	clean: function(prop) {
		var id = this[expando];
		var itemData = data[id];
		if (itemData && itemData[prop]) {
			delete itemData[prop];
		}
		if(isEmptyObject(itemData)) {
			deleteNode.call(this);
		}
	},

	delete: deleteNode
};
