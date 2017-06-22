import QUnit from '../../test/qunit.js';
import isPromise from './is-promise-like.js';

QUnit.module("can-util/js/is-promise-like");

QUnit.test("basics", function () {
	QUnit.ok(isPromise({ then: function () {} }));
});