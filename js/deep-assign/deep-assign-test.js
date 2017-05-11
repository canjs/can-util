'use strict';

var QUnit = require('../../test/qunit');
var deepAssign = require('./deep-assign');

QUnit.module("can-util/js/deep-assign");

QUnit.test("basics", function(){
	var original = { nested: {foo: "bar"} };
	var res = deepAssign(true, {},original );
	deepEqual(res, {nested: {foo: "bar"}}, "they look the same");

	ok(res.nested !== original.nested, "different objects");
});
