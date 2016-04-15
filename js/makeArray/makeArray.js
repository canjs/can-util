var each = require('can-util/js/each/');

function makeArray(arr) {
	var ret = [];
	each(arr, function (a, i) {
		ret[i] = a;
	});
	return ret;
}

module.exports = makeArray;
