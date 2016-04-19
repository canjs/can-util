var isNode = require('./is-node');

QUnit.module("can-util/js/is-node");

test("basics", function(){
	equal(typeof isNode(), "boolean");
});
