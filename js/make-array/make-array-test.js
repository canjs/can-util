'use strict';

var QUnit = require('../../test/qunit');
var makeArray = require('./make-array');

QUnit.module("can-util/js/make-array");

QUnit.test("basics", function(assert){
	var res = makeArray({0: "a", length: 1});
	assert.deepEqual(res,["a"]);
	assert.ok(res instanceof Array);
});

QUnit.test("with Object", function (assert) {
	var res = makeArray({
		abc: 'xyz',
		bar: 'foo'
	});
	assert.deepEqual(res, [{
		abc: 'xyz',
		bar: 'foo'
	}]);
	assert.ok(res instanceof Array);
});

QUnit.test("with number", function (assert) {
	var res = makeArray(1);
	assert.deepEqual(res, [1]);
	assert.ok(res instanceof Array);
});

QUnit.test("with zero", function (assert) {
	var res = makeArray(0);
	assert.deepEqual(res, [0]);
	assert.ok(res instanceof Array);
});

QUnit.test("with null", function (assert) {
	var res = makeArray(null);
	assert.deepEqual(res, []);
	assert.ok(res instanceof Array);
});

