var isArray  = require('can-util/js/is-array/');

var QUnit = require('steal-qunit');

QUnit.module('can-util/js/is-array');

QUnit.test("basics", function(){
	ok(isArray([]));
	ok(!isArray({0: "a", length: 1}));
});
