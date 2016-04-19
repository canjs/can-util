var isPromise = require('can-util/js/is-promise/');
var QUnit = require('steal-qunit');

QUnit.module("can-util/js/is-promise");

QUnit.test("basics", function(){
	ok(isPromise({"catch": function(){}, then: function(){}}));
});
