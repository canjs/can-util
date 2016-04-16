var isPromise = require('can-util/js/isPromise/');
var QUnit = require('steal-qunit');

QUnit.module("can-util/js/isPromise")

QUnit.test("basics", function(){
	ok(isPromise({"catch": function(){}, then: function(){}}));
});
