'use strict';

var QUnit = require('../../test/qunit');
var makeArray = require('./make-array');

QUnit.module("can-util/js/make-array");

QUnit.test("basics", function(){
	var res = makeArray({0: "a", length: 1});
	QUnit.deepEqual(res,["a"]);
	QUnit.ok(res instanceof Array);
});

QUnit.test("with Object", function () {
	var res = makeArray({
		abc: 'xyz',
		bar: 'foo'
	});
	QUnit.deepEqual(res, [{
		abc: 'xyz',
		bar: 'foo'
	}]);
	QUnit.ok(res instanceof Array);
});

QUnit.test("with number", function () {
	var res = makeArray(1);
	QUnit.deepEqual(res, [1]);
	QUnit.ok(res instanceof Array);
});

QUnit.test("with zero", function () {
	var res = makeArray(0);
	QUnit.deepEqual(res, [0]);
	QUnit.ok(res instanceof Array);
});

QUnit.test("with null", function () {
	var res = makeArray(null);
	QUnit.deepEqual(res, []);
	QUnit.ok(res instanceof Array);
});

