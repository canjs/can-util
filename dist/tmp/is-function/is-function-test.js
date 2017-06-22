import QUnit from '../../test/qunit';
import isFunction from './is-function';


QUnit.module("can-util/js/is-function");

QUnit.test("basics", function () {
	QUnit.ok(isFunction(function () {}));
});