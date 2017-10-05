'use strict';

var QUnit = require('../../test/qunit');
var isPlainObject = require('./is-plain-object');

QUnit.module("can-util/js/is-plain-object");

QUnit.test("basics", function(assert){
	assert.ok(isPlainObject({foo : "bar"}));
});

QUnit.test("objects with prototypes", function(assert){
	var Ctr = function(){};
	var obj = new Ctr();

	assert.equal(isPlainObject(obj), false, "not a plain object");
});

QUnit.test("new Object", function(assert){
	var obj;
	/* jshint ignore:start */
	obj = new Object();
	/* jshint ignore:end */

	assert.equal(isPlainObject(obj), true, "using new Object gives you a plain object");
});

QUnit.test("Booleans", function(assert){
	assert.equal(isPlainObject(true), false, "Boolean value true is false");
	assert.equal(isPlainObject(Boolean(true)), false, "Boolean constructor");
});

QUnit.test("Numbers", function(assert){
	assert.equal(isPlainObject(15.66), false, "number is not a plain object");
	assert.equal(isPlainObject(parseInt(13)), false, "integer is not a plain object");
});

QUnit.test("NaN", function(assert){
	assert.equal(isPlainObject(NaN), false, "NaN is not a plain object");
});
