var assignNonEnumerable = require('./assign-non-enumerable');
var QUnit = require('../../test/qunit');

QUnit.module("can-util/js/assign-non-enumerable");

QUnit.test("Assign all properties to an object", function(assert){
	var a = {a: 1};
	var b = {b: 3, c: 2};
	var actual = assignNonEnumerable(a, b);

	assert.equal(a, actual);

	for(var prop in a) {
		if(prop !== "a") {
			assert.ok(false, "we got a prop of "+prop);
		}
	}
	assert.equal( actual.b, 3);
	assert.equal( actual.c, 2);

	actual.b = "B";
	assert.equal( actual.b, "B");
});
