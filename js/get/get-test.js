'use strict';

var QUnit = require('../../test/qunit');

var get  = require('./get');

QUnit.module('can-util/js/get');

QUnit.test('get Single root', function (assert) {
	// ## Single root
	var root, result;
	// # Only get
	root = {
		foo: 'bar'
	};
	// exists
	result = get(root, 'foo');
	assert.equal(result, 'bar', 'got \'bar\'');
	// not exists
	result = get(root, 'baz');
	assert.equal(result, undefined, 'got \'undefined\'');
});

QUnit.test('get Deep objects', function (assert) {
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
	assert.equal(result, 'baz', 'got \'baz\'');
	// not exists
	result = get(root, 'foo.world');
	assert.equal(result, undefined, 'got \'undefined\'');

	result = get(root, 'baz.world');
	assert.equal(result, undefined, 'got \'undefined\'');
});

QUnit.test('get with numeric index', function (assert) {
	var list = [1,2,3],
		result0 = get(list, 0);

	assert.equal(result0, 1, 'got the 1st element of the list');
	
	var result1 = get(list, 1);
	assert.equal(result1, 2, 'got the 2nd element of the list');
});
