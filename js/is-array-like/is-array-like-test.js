var QUnit = require('../../test/qunit');
var isArrayLike = require('./is-array-like');

QUnit.module("can-util/js/is-array-like");

QUnit.test("basics", function(){
	ok(isArrayLike({0: 1, length: 1}));
});


QUnit.test("string", function(){
	ok(isArrayLike("yes"));
});
