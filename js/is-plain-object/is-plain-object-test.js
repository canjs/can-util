'use strict';

var QUnit = require('../../test/qunit');
var isPlainObject = require('./is-plain-object');

QUnit.module("can-util/js/is-plain-object");

QUnit.test("basics", function(){
	QUnit.ok(isPlainObject({foo : "bar"}));
});

QUnit.test("objects with prototypes", function(){
	var Ctr = function(){};
	var obj = new Ctr();

	QUnit.equal(isPlainObject(obj), false, "not a plain object");
});

QUnit.test("new Object", function(){
	var obj;
	/* jshint ignore:start */
	obj = new Object();
	/* jshint ignore:end */

	QUnit.equal(isPlainObject(obj), true, "using new Object gives you a plain object");
});

QUnit.test("Booleans", function(){
	QUnit.equal(isPlainObject(true), false, "Boolean value true is false");
	QUnit.equal(isPlainObject(Boolean(true)), false, "Boolean constructor");
});

QUnit.test("Numbers", function(){
	QUnit.equal(isPlainObject(15.66), false, "number is not a plain object");
	QUnit.equal(isPlainObject(parseInt(13)), false, "integer is not a plain object");
});

QUnit.test("NaN", function(){
	QUnit.equal(isPlainObject(NaN), false, "NaN is not a plain object");
});
