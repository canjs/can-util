var isPlainObject = require('can-util/js/is-plain-object/');
var QUnit = require('steal-qunit');

QUnit.module("can-util/js/is-plain-object")

QUnit.test("basics", function(){
	ok(isPlainObject({foo : "bar"}));
});
