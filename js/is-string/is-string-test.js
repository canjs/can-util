var isString = require('can-util/js/is-string/');
var QUnit = require('steal-qunit');

QUnit.module("can-util/js/is-string");

QUnit.test("basics", function(){
	ok(isString("yes"));
});
