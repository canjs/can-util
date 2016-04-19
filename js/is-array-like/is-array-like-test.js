var isArrayLike = require('can-util/js/is-array-like/');
var QUnit = require('steal-qunit');

QUnit.module("can-util/js/is-array-like");

QUnit.test("basics", function(){
	ok(isArrayLike({0: 1, length: 1}));
});
