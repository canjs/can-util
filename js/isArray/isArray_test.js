var isArray  = require('can-util/js/isArray/');

var QUnit = require('steal-qunit');

QUnit.module('can-util/js/isArray');

QUnit.test("basics", function(){
	ok(isArray([]));
	ok(!isArray({0: "a", length: 1}));
});
