'use strict';

var QUnit = require('../../test/qunit');
var isArrayLike = require('./is-array-like');

QUnit.module("can-util/js/is-array-like");

QUnit.test("basics", function(){
	ok(isArrayLike({0: 1, length: 1}));
});


QUnit.test("string", function(){
	ok(isArrayLike("yes"));
});

QUnit.test("Object with a .length property", function(){
	var obj = {
		length: 0
	};

	ok(isArrayLike(obj));
});

QUnit.test("function should be false", function(){
	var func = function(){};
	ok( !isArrayLike( func ) );
});

QUnit.test("0 should be false", function(){
	ok( !isArrayLike( 0 ) );
});