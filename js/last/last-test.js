var last = require('./last');

QUnit.module("can-util/js/last");

test("basics", function(){
	QUnit.equal(last(["a","b"]), "b");
});
