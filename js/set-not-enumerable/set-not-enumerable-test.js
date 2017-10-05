'use strict';

var QUnit = require('../../test/qunit');
var setNotEnumerable = require('./set-not-enumerable');

QUnit.module("can-util/js/set-not-enumerable");

QUnit.test("basics", function(assert){
	assert.expect(0);
	var obj = {};
	setNotEnumerable(obj, "prop", "val");
	for(var prop in obj) {
		assert.ok(false, prop);
	}
});
