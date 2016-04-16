var joinURIs = require('can-util/js/joinURIs/');
var QUnit = require('steal-qunit');

QUnit.module("can-util/js/joinURIs")

QUnit.test("basics", function(){
	QUnit.deepEqual(joinURIs("foo/bar/car.html", "../zed.html"), "foo/zed.html");
});
