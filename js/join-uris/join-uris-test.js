var joinURIs = require('./join-uris');

QUnit.module("can-util/js/join-uris");

test("basics", function(){
	QUnit.deepEqual(joinURIs("foo/bar/car.html", "../zed.html"), "foo/zed.html");
});
