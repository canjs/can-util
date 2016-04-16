var isArrayLike = require('can-util/js/isArrayLike/');
var QUnit = require('steal-qunit');

QUnit.module("can-util/js/isArrayLike")

QUnit.test("basics", function(){
	ok(isArrayLike({0: 1, length: 1}));
});
