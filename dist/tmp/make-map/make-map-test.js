import QUnit from '../../test/qunit';
import makeMap from './make-map';


QUnit.module("can-util/js/make-map");

QUnit.test("basics", function () {
	var res = makeMap("a,b,c");
	QUnit.deepEqual(res, { a: true, b: true, c: true });
	QUnit.ok(res instanceof Object);
});