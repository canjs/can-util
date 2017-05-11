'use strict';

var QUnit = require('../../test/qunit');
var string = require('./string');

QUnit.module("can-util/js/string");

QUnit.test('string.sub', function () {
	equal(string.sub('a{b}', {
		b: 'c'
	}), 'ac');
	var foo = {
		b: 'c'
	};
	equal(string.sub('a{b}', foo, true), 'ac');
	ok(!foo.b, 'b\'s value was removed');
});

QUnit.test('string.sub with undefined values', function () {
	var subbed = string.sub('test{exists} plus{noexists}', {
		exists: 'test'
	});
	deepEqual(subbed, null, 'Rendering with undefined values should return null');
	subbed = string.sub('test{exists} plus{noexists}', {
		exists: 'test'
	}, true);
	deepEqual(subbed, null, 'Rendering with undefined values should return null even when remove param is true');
});

QUnit.test('string.sub with null values', function () {
	var subbed = string.sub('test{exists} plus{noexists}', {
		exists: 'test',
		noexists: null
	});
	deepEqual(subbed, null, 'Rendering with null values should return null');
	subbed = string.sub('test{exists} plus{noexists}', {
		exists: 'test',
		noexists: null
	}, true);
	deepEqual(subbed, null, 'Rendering with null values should return null even when remove param is true');
});

QUnit.test('string.sub double', function () {
	equal(string.sub('{b} {d}', {
		b: 'c',
		d: 'e'
	}), 'c e');
});

QUnit.test('String.underscore', function () {
	equal(string.underscore('Foo.Bar.ZarDar'), 'foo.bar.zar_dar');
});

QUnit.test('string.sub remove', function () {
	var obj = {
		a: 'a'
	};
	equal(string.sub('{a}', obj, false), 'a');
	deepEqual(obj, {
		a: 'a'
	});
	equal(string.sub('{a}', obj, true), 'a');
	deepEqual(obj, {});
});

QUnit.test('string.getObject Single root', function () {
	// ## Single root
	var root, result;
	// # Only get
	root = {
		foo: 'bar'
	};
	// exists
	result = string.getObject('foo', root);
	equal(result, 'bar', 'got \'bar\'');
	// not exists
	result = string.getObject('baz', root);
	equal(result, undefined, 'got \'undefined\'');
});

QUnit.test('string.getObject Multiple root', function () {
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
	result = string.getObject('a', roots);
	equal(result, 1, 'got \'1\'');
	// exists in second root
	result = string.getObject('b', roots);
	equal(result, 2, 'got \'2\'');
	// not exists anywhere
	result = string.getObject('c', roots);
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
	result = string.getObject('b', roots);
	equal(result, 2, 'got \'2\'');
});

QUnit.test('string.getObject Deep objects', function () {
	// ## Deep objects
	var root, result;
	// # Only get
	root = {
		foo: {
			bar: 'baz'
		}
	};
	// exists
	result = string.getObject('foo.bar', root);
	equal(result, 'baz', 'got \'baz\'');
	// not exists
	result = string.getObject('foo.world', root);
	equal(result, undefined, 'got \'undefined\'');
});

QUnit.test('string.esc', function () {
	var text = string.esc(0);
	equal(text, '0', '0 value properly rendered');
	text = string.esc(null);
	deepEqual(text, '', 'null value returns empty string');
	text = string.esc();
	deepEqual(text, '', 'undefined returns empty string');
	text = string.esc(NaN);
	deepEqual(text, '', 'NaN returns empty string');
	text = string.esc('<div>&nbsp;</div>');
	equal(text, '&lt;div&gt;&amp;nbsp;&lt;/div&gt;', 'HTML escaped properly');
});

QUnit.test('string.camelize', function () {
	var text = string.camelize(0);
	equal(text, '0', '0 value properly rendered');
	text = string.camelize(null);
	equal(text, '', 'null value returns empty string');
	text = string.camelize();
	equal(text, '', 'undefined returns empty string');
	text = string.camelize(NaN);
	equal(text, '', 'NaN returns empty string');
	text = string.camelize('-moz-index');
	equal(text, 'MozIndex');
	text = string.camelize('foo-bar');
	equal(text, 'fooBar');
});

QUnit.test('string.hyphenate', function () {
	var text = string.hyphenate(0);
	equal(text, '0', '0 value properly rendered');
	text = string.hyphenate(null);
	equal(text, '', 'null value returns empty string');
	text = string.hyphenate();
	equal(text, '', 'undefined returns empty string');
	text = string.hyphenate(NaN);
	equal(text, '', 'NaN returns empty string');
	text = string.hyphenate('ABC');
	equal(text, 'ABC');
	text = string.hyphenate('dataNode');
	equal(text, 'data-node');
});
