import QUnit from '../../test/qunit.js';
import isString from './is-string.js';

QUnit.module("can-util/js/is-string");

QUnit.test("basics", function () {
	QUnit.equal(isString("yes"), true);
	QUnit.equal(isString(String("yes")), true);
});