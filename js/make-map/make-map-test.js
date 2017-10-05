'use strict';

var QUnit = require('../../test/qunit');
var makeMap = require('./make-map');

QUnit.module("can-util/js/make-map");

QUnit.test("basics", function(assert){
	var res = makeMap("a,b,c");
	assert.deepEqual(res, { a: true, b: true, c: true });
	assert.ok(res instanceof Object);
});
