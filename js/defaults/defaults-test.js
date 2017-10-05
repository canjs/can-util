'use strict';

var defaults = require('./defaults');
var QUnit = require('../../test/qunit');

QUnit.module("can-util/js/defaults");

QUnit.test("Assigns props from sources to object if they are undefined in object", function(assert) {
	var a = {a: 1, b: 2, c: 3};
	var b = {a: 2, b: 3, d: 4};
	var c = {d: 5, e: 5};
	
	var expected =  {a: 1, b: 2, c: 3, d: 4, e: 5};
	
	var actual = defaults(a, b, c);

	for (var prop in actual){
		assert.equal(expected[prop], actual[prop]);
	}
});
