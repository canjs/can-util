var QUnit = require('../../test/qunit');
var deepAssign = require('./deep-assign');

QUnit.module("can-util/js/deep-assign");

QUnit.test("basics", function(){
	var original = { nested: {foo: "bar"} };
	var res = deepAssign({}, original );
	deepEqual(res, {nested: {foo: "bar"}}, "they look the same");

	ok(res.nested !== original.nested, "different objects");
});

QUnit.test("merges multiple objects", function () {
	var target = {},
		first = {first: {foo: 'bar'}},
		second = {second: {baz: 'qux'}};
	var res = deepAssign(target, first, second);

	deepEqual(res, {first: {foo: 'bar'}, second: {baz: 'qux'}}, "merges multiple objects");

	ok(res.first !== first.first, "different objects");
	ok(res.second !== second.second, "different objects");
});
