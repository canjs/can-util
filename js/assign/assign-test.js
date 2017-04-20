'use strict';

var assign = require('./assign');
var QUnit = require('../../test/qunit');

QUnit.module("can-util/js/assign");

QUnit.test("Assign all properties to an object", function(){
	var a = {a: 1, b: 2, d: 3};
	var b = {a: 1, b: 3, c: 2};
	var expected =  {a: 1, b: 3, c: 2, d: 3};
	var actual = assign(a, b);

	for (var prop in actual){
		equal(expected[prop], actual[prop]);
	}
});
