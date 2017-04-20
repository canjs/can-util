'use strict';

var isEmptyObject = require("./is-empty-object");
var QUnit = require("../../test/qunit");

QUnit.module("can-util/js/is-empty-object/is-empty-object");

QUnit.test("Returns true for plain objects", function(assert){
	assert.ok(isEmptyObject({}), "{} is true");

	/* jshint ignore:start */
	assert.ok(isEmptyObject(new Object()), "new Object is true");
	/* jshint ignore:end */
});

QUnit.test("Plain objects with properties are false", function(assert){
	assert.equal(isEmptyObject({ a: 1 }), false, "not empty");
});

// Skipping while we determine if this should happen
// https://github.com/canjs/can-util/issues/24
/*
QUnit.skip("Objects with non-enumerable props are false", function(assert){
	var obj = {};
	Object.defineProperty(obj, "foo", {
		enumerable: false,
		value: "bar"
	});

	assert.equal(isEmptyObject(obj), false, "Not an empty object");
});
*/

QUnit.test("Returns true for custom objects with no props", function(assert){
	var Thing = function(){};
	
	assert.equal(isEmptyObject(new Thing()), true, "is empty");

	var thing2 = new Thing();
	thing2.foo = "bar";
	assert.equal(isEmptyObject(thing2), false, "not empty");
});
