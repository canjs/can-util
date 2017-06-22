import QUnit from '../../test/qunit';
import joinURIs from './join-uris';


QUnit.module("can-util/js/join-uris");

QUnit.test("basics", function () {
	QUnit.deepEqual(joinURIs("foo/bar/car.html", "../zed.html"), "foo/zed.html");
});