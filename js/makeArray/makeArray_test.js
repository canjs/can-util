var makeArray = require('can-util/js/makeArray/');
var QUnit = require('steal-qunit');

QUnit.module("can-util/js/makeArray")

QUnit.test("basics", function(){
	var res = makeArray({0: "a", length: 1})
	QUnit.deepEqual(res,["a"]);
	QUnit.ok(res instanceof Array);
});
