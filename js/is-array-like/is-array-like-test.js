var isArrayLike = require('./is-array-like');

QUnit.module("can-util/js/is-array-like");

test("basics", function(){
	ok(isArrayLike({0: 1, length: 1}));
});
