'use strict';

var QUnit = require('../../test/qunit');
var isArrayLike = require('./is-array-like');

QUnit.module("can-util/js/is-array-like");

QUnit.test("basics", function(assert){
	assert.ok(isArrayLike({0: 1, length: 1}));
});


QUnit.test("string", function(assert){
	assert.ok(isArrayLike("yes"));
});

QUnit.test("Object with a .length property", function(assert){
	var obj = {
		length: 0
	};

	assert.ok(isArrayLike(obj));
});

QUnit.test("function should be false", function(assert){
	var func = function(){};
	assert.ok( !isArrayLike( func ) );
});

QUnit.test("0 should be false", function(assert){
	assert.ok( !isArrayLike( 0 ) );
});
