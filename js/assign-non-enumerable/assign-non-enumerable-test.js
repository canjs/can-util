var assignNonEnumerable = require('./assign-non-enumerable');
var QUnit = require('../../test/qunit');

QUnit.module("can-util/js/assign-non-enumerable");

QUnit.test("Assign all properties to an object", function(){
	var a = {a: 1};
	var b = {b: 3, c: 2};
	var actual = assignNonEnumerable(a, b);

	QUnit.equal(a, actual);

	for(var prop in a) {
		if(prop !== "a") {
			QUnit.ok(false, "we got a prop of "+prop);
		}
	}
	QUnit.equal( actual.b, 3);
	QUnit.equal( actual.c, 2);

	actual.b = "B";
	QUnit.equal( actual.b, "B");
});
