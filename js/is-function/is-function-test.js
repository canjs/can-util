var isFunction = require('./is-function');

QUnit.module("can-util/js/is-function");

test("basics", function(){
	ok(isFunction(function(){}));
});
