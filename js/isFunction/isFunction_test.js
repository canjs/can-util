var isFunction = require('can-util/js/isFunction/');
var QUnit = require('steal-qunit');

QUnit.module("can-util/js/isFunction")

QUnit.test("basics", function(){
	ok(isFunction(function(){}));
});
