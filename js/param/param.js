var isArray = require('../is-array/is-array');

function buildParam(prefix, obj, add) {
	if (isArray(obj)) {
		for (var i = 0, l = obj.length; i < l; ++i) {
			add(prefix + '[]', obj[i]);
		}
	} else if ( obj && typeof obj === "object" ) {
		for (var name in obj) {
			buildParam(prefix + '[' + name + ']', obj[name], add);
		}
	} else {
		add(prefix, obj);
	}
}

module.exports = function param(object) {
	var pairs = [],
		add = function (key, value) {
			pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
		};
	for (var name in object) {
		buildParam(name, object[name], add);
	}
	return pairs.join('&')
		.replace(/%20/g, '+');
};
