var joinURIs = require('can-util/js/join-uris/');
var QUnit = require('steal-qunit');

QUnit.module("can-util/js/join-uris");

QUnit.test("basics", function(){
	QUnit.deepEqual(joinURIs("foo/bar/car.html", "../zed.html"), "foo/zed.html");
});
