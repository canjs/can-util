import QUnit from '../../test/qunit.js';
import setNotEnumerable from './set-not-enumerable.js';

QUnit.module("can-util/js/set-not-enumerable");

QUnit.test("basics", 0, function () {
	var obj = {};
	setNotEnumerable(obj, "prop", "val");
	for (var prop in obj) {
		ok(false, prop);
	}
});