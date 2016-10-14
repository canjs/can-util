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
	result = get('foo', root);
	equal(result, 'bar', 'got \'bar\'');
	// not exists
	result = get('baz', root);
	equal(result, undefined, 'got \'undefined\'');
});

QUnit.test('get Multiple root', function () {
	// ## Multiple roots
	var root1, root2, roots, result;
	// # Only get
	root1 = {
		a: 1
	};
	root2 = {
		b: 2
	};
	roots = [
		root1,
		root2
	];
	// exists in first root
	result = get('a', roots);
	equal(result, 1, 'got \'1\'');
	// exists in second root
	result = get('b', roots);
	equal(result, 2, 'got \'2\'');
	// not exists anywhere
	result = get('c', roots);
	equal(result, undefined, 'got \'undefined\'');
	// # One of roots is not an object
	// exists in second root
	root1 = undefined;
	root2 = {
		b: 2
	};
	roots = [
		root1,
		root2
	];
	result = get('b', roots);
	equal(result, 2, 'got \'2\'');
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
	result = get('foo.bar', root);
	equal(result, 'baz', 'got \'baz\'');
	// not exists
	result = get('foo.world', root);
	equal(result, undefined, 'got \'undefined\'');
});
