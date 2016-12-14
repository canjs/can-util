var deepAssign = require('./js/deep-assign/deep-assign');
var namespace = require('can-namespace');

function omit(obj, omitObj) {
	var out = {};
	for (var prop in obj) {
		if (!omitObj[prop]) {
			out[prop] = obj[prop];
		}
	}
	return out;
}

module.exports = deepAssign(namespace, require('./dom/dom'), omit(require('./js/js'), { cid: true, types: true }));
