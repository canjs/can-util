var isPlainObject = require('./is-plain-object');

QUnit.module("can-util/js/is-plain-object");

test("basics", function(){
	ok(isPlainObject({foo : "bar"}));
});
