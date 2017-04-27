'use strict';

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

QUnit.test('get with numeric index', function () {
	var list = [1,2,3],
		result0 = get(list, 0);

	equal(result0, 1, 'got the 1st element of the list');
	
	var result1 = get(list, 1);
	equal(result1, 2, 'got the 2nd element of the list');
});
