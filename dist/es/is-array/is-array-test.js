import QUnit from '../../test/qunit.js';
import isArray from './is-array.js';

QUnit.module('can-util/js/is-array');

QUnit.test("basics", function () {
	ok(isArray([]));
	ok(!isArray({ 0: "a", length: 1 }));
});