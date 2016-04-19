var last = require('can-util/js/last/');
var QUnit = require('steal-qunit');

QUnit.module("can-util/js/last");

QUnit.test("basics", function(){
	QUnit.equal(last(["a","b"]), "b");
});
