import QUnit from '../../test/qunit';
import isArray from './is-array';


QUnit.module('can-util/js/is-array');

QUnit.test("basics", function () {
	ok(isArray([]));
	ok(!isArray({ 0: "a", length: 1 }));
});