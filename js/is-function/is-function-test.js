var isFunction = require('can-util/js/is-function/');
var QUnit = require('steal-qunit');

QUnit.module("can-util/js/is-function")

QUnit.test("basics", function(){
	ok(isFunction(function(){}));
});
