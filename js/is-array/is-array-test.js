var isArray  = require('./is-array');

QUnit.module('can-util/js/is-array');

test("basics", function(){
	ok(isArray([]));
	ok(!isArray({0: "a", length: 1}));
});
