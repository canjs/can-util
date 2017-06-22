import QUnit from '../../test/qunit';
import isNode from './is-node';


QUnit.module("can-util/js/is-node");

test("basics", function () {
	QUnit.equal(typeof isNode(), "boolean");
});