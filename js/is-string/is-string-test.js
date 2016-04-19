var isString = require('./is-string');

QUnit.module("can-util/js/is-string");

QUnit.test("basics", function(){
	ok(isString("yes"));
});
