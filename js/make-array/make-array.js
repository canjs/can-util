var each = require('../each/each');

/**
 * @module {function} can-util/js/make-array/make-array makeArray
 * @parent can-util/js
 * @signature `makeArray(arr)`
 * @param  {ArrayLike} arr any array-like object
 * @return {Array}     a JavaScript array object with the same elements as the passed-in ArrayLike
 *
 * makeArray takes any array-like object (can-list, NodeList, etc.) and converts it to a JavaScript array
 */
function makeArray(arr) {
	var ret = [];
	each(arr, function (a, i) {
		ret[i] = a;
	});
	return ret;
}

module.exports = makeArray;
