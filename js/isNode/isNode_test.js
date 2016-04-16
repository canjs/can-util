var isNode = require('can-util/js/isNode/');
var QUnit = require('steal-qunit');

QUnit.module("can-util/js/isNode")

QUnit.test("basics", function(){
	equal(typeof isNode(), "boolean");
});
