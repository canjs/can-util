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

module.exports = {
	expando: expando,
	clean: function(prop) {
		var id = this[expando];
		delete data[id][prop];
	},
	get: function(name){
		var id = this[expando],
			store = id && data[id];
		return name === undefined ? store || setData(this) : store && store[name];
	},
	set: setData
}
