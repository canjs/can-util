var isPlainObject = require('can-util/js/isPlainObject/');
var QUnit = require('steal-qunit');

QUnit.module("can-util/js/isPlainObject")

QUnit.test("basics", function(){
	ok(isPlainObject({foo : "bar"}));
});
