var deepExtend = require('can-util/js/deep-extend/');
var QUnit = require('steal-qunit');

QUnit.module("can-util/js/deep-extend")

QUnit.test("basics", function(){
	var original = {nested: {foo: "bar"}}
	var res = deepExtend(true, {},original );
	deepEqual(res, {nested: {foo: "bar"}}, "they look the same");

	ok(res.nested !== original.nested, "different objects");
});
