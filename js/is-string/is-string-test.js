var QUnit = require('../../test/qunit');
var isString = require('./is-string');

QUnit.module("can-util/js/is-string");

QUnit.test("basics", function(){
	QUnit.ok(isString("yes"));
});
