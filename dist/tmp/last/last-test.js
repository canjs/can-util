import QUnit from '../../test/qunit';
import last from './last';


QUnit.module("can-util/js/last");

QUnit.test("basics", function () {
	QUnit.equal(last(["a", "b"]), "b");
});