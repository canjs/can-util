'use strict';

var omit = require('./omit');
var QUnit = require('../../test/qunit');

QUnit.module("can-util/js/omit");

QUnit.test("Omit properties from an object", function(assert){
	var source = {a: 1, b: 2, c: 3, d: 4};
	var propsToOmit = [ 'b', 'd' ];
	var expected =  {a: 1, c: 3};
	var actual = omit(source, propsToOmit);
	assert.deepEqual(expected, actual);
});
