import QUnit from '../../test/qunit';
import isPromise from './is-promise-like';


QUnit.module("can-util/js/is-promise-like");

QUnit.test("basics", function () {
	QUnit.ok(isPromise({ then: function () {} }));
});