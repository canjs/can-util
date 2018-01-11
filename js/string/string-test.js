'use strict';

var QUnit = require('../../test/qunit');
var string = require('./string');
var get = require('../get/get');

QUnit.module("can-util/js/string");

QUnit.test('string.sub', function (assert) {
	assert.equal(string.sub('a{b}', {
		b: 'c'
	}), 'ac');
	var foo = {
		b: 'c'
	};
	assert.equal(string.sub('a{b}', foo, true), 'ac');
	assert.ok(!foo.b, 'b\'s value was removed');
});

QUnit.test('string.sub with undefined values', function (assert) {
	var subbed = string.sub('test{exists} plus{noexists}', {
		exists: 'test'
	});
	assert.deepEqual(subbed, null, 'Rendering with undefined values should return null');
	subbed = string.sub('test{exists} plus{noexists}', {
		exists: 'test'
	}, true);
	assert.deepEqual(subbed, null, 'Rendering with undefined values should return null even when remove param is true');
});

QUnit.test('string.sub with null values', function (assert) {
	var subbed = string.sub('test{exists} plus{noexists}', {
		exists: 'test',
		noexists: null
	});
	assert.deepEqual(subbed, null, 'Rendering with null values should return null');
	subbed = string.sub('test{exists} plus{noexists}', {
		exists: 'test',
		noexists: null
	}, true);
	assert.deepEqual(subbed, null, 'Rendering with null values should return null even when remove param is true');
});

QUnit.test('string.sub double', function (assert) {
	assert.equal(string.sub('{b} {d}', {
		b: 'c',
		d: 'e'
	}), 'c e');
});

QUnit.test('String.underscore', function (assert) {
	assert.equal(string.underscore('Foo.Bar.ZarDar'), 'foo.bar.zar_dar');
});

QUnit.test('string.sub remove', function (assert) {
	var obj = {
		a: 'a'
	};
	assert.equal(string.sub('{a}', obj, false), 'a');
	assert.deepEqual(obj, {
		a: 'a'
	});
	assert.equal(string.sub('{a}', obj, true), 'a');
	assert.deepEqual(obj, {});
});

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

QUnit.test('get Multiple root', function (assert) {
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
	result = get(roots, '0.a');
	assert.equal(result, 1, 'got \'1\'');
	// exists in second root
	result = get(roots, '1.b');
	assert.equal(result, 2, 'got \'2\'');
	// not exists anywhere
	result = get(roots, 'c');
	assert.equal(result, undefined, 'got \'undefined\'');
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
	result = get(roots, '1.b');
	assert.equal(result, 2, 'got \'2\'');
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
});

QUnit.test('string.esc', function (assert) {
	var text = string.esc(0);
	assert.equal(text, '0', '0 value properly rendered');
	text = string.esc(null);
	assert.deepEqual(text, '', 'null value returns empty string');
	text = string.esc();
	assert.deepEqual(text, '', 'undefined returns empty string');
	text = string.esc(NaN);
	assert.deepEqual(text, '', 'NaN returns empty string');
	text = string.esc('<div>&nbsp;</div>');
	assert.equal(text, '&lt;div&gt;&amp;nbsp;&lt;/div&gt;', 'HTML escaped properly');
});

QUnit.test('string.camelize', function (assert) {
	var text = string.camelize(0);
	assert.equal(text, '0', '0 value properly rendered');
	text = string.camelize(null);
	assert.equal(text, '', 'null value returns empty string');
	text = string.camelize();
	assert.equal(text, '', 'undefined returns empty string');
	text = string.camelize(NaN);
	assert.equal(text, '', 'NaN returns empty string');
	text = string.camelize('-moz-index');
	assert.equal(text, 'MozIndex');
	text = string.camelize('foo-bar');
	assert.equal(text, 'fooBar');
});

QUnit.test('string.hyphenate', function (assert) {
	var text = string.hyphenate(0);
	assert.equal(text, '0', '0 value properly rendered');
	text = string.hyphenate(null);
	assert.equal(text, '', 'null value returns empty string');
	text = string.hyphenate();
	assert.equal(text, '', 'undefined returns empty string');
	text = string.hyphenate(NaN);
	assert.equal(text, '', 'NaN returns empty string');
	text = string.hyphenate('ABC');
	assert.equal(text, 'ABC');
	text = string.hyphenate('dataNode');
	assert.equal(text, 'data-node');
});

QUnit.test('string.replaceWith should substitute paths with replacer values', function (assert) {
	assert.expect(5);

	var str = 'I like {food} and {hobbies.favorite}';
	var data = {
		food: 'cake',
		hobbies: {
			favorite: 'writing unit tests'
		}
	};
	var callCount = 0;
	var replacer = function (key, value) {
		callCount++;
		if (callCount === 1) {
			assert.equal(key, 'food');
			assert.equal(value, 'cake');
		}
		if (callCount === 2) {
			assert.equal(key, 'hobbies.favorite');
			assert.equal(value, 'writing unit tests');
		}
		return value;
	};

	assert.equal(
		string.replaceWith(str, data, replacer),
		'I like cake and writing unit tests'
	);
});
