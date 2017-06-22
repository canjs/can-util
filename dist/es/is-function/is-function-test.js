import QUnit from '../../test/qunit.js';
import isFunction from './is-function.js';

QUnit.module("can-util/js/is-function");

QUnit.test("basics", function () {
	QUnit.ok(isFunction(function () {}));
});