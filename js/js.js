'use strict';



module.exports = {
	assign: require('./assign/assign'),
	cid: require('can-cid'),
	deepAssign: require('./deep-assign/deep-assign'),
	dev: require('./dev/dev'),
	diff: require('./diff/diff'),
	each: require('./each/each'),
	global: require('./global/global'),
	"import": require('./import/import'),
	isArray: require('./is-array/is-array'),
	isArrayLike: require('./is-array-like/is-array-like'),
	isBrowserWindow: require('./is-browser-window/is-browser-window'),
	isEmptyObject: require('./is-empty-object/is-empty-object'),
	isFunction: require('./is-function/is-function'),
	isNode: require('./is-node/is-node'),
	isPlainObject: require('./is-plain-object/is-plain-object'),
	isPromise: require('./is-promise/is-promise'),
	isString: require('./is-string/is-string'),
	isWebWorker: require('./is-web-worker/is-web-worker'),
	joinURIs: require('./join-uris/join-uris'),
	last: require('./last/last'),
	makeArray: require('./make-array/make-array'),
	omit: require('./omit/omit'),
	setImmediate: require('./set-immediate/set-immediate'),
	string: require('./string/string'),
	types: require('can-types')
};
