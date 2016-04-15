var data = {};
var expando = 'can'+new Date();
var setData = function(name, value) {
	var id = this[exp] || (this[exp] = ++uuid),
		store = data[id] || (data[id] = {});
	if (name !== undefined) {
		store[name] = value;
	}
	return store;
};

module.exports = {
	expando: expando,
	clean: function(prop) {
		var id = this[exp];
		delete data[id][prop];
	},
	get: function(name){
		var id = this[exp],
			store = id && data[id];
		return name === undefined ? store || setData(this) : store && store[name];
	},
	set: setData
}
