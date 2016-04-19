var isNode = require('can-util/js/is-node/');
var QUnit = require('steal-qunit');

QUnit.module("can-util/js/is-node");

QUnit.test("basics", function(){
	equal(typeof isNode(), "boolean");
});
