import QUnit from '../../test/qunit.js';
import isNode from './is-node.js';

QUnit.module("can-util/js/is-node");

test("basics", function () {
	QUnit.equal(typeof isNode(), "boolean");
});