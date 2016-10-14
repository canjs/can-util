var QUnit = require('../../test/qunit');

var get  = require('./get');

QUnit.module('can-util/js/get');

QUnit.test('get Single root', function () {
	// ## Single root
	var root, result;
	// # Only get
	root = {
		foo: 'bar'
	};
	// exists
	result = get(root, 'foo');
	equal(result, 'bar', 'got \'bar\'');
	// not exists
	result = get(root, 'baz');
	equal(result, undefined, 'got \'undefined\'');
});

QUnit.test('get Deep objects', function () {
	// ## Deep objects
	var root, result;
	// # Only get
	root = {
		foo: {
			bar: 'baz'
		}
	};
	// exists
	result = get(root, 'foo.bar');
	equal(result, 'baz', 'got \'baz\'');
	// not exists
	result = get(root, 'foo.world');
	equal(result, undefined, 'got \'undefined\'');
});
