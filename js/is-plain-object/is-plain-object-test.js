var QUnit = require('../../test/qunit');
var isPlainObject = require('./is-plain-object');

QUnit.module("can-util/js/is-plain-object");

QUnit.test("basics", function(){
	QUnit.ok(isPlainObject({foo : "bar"}));
});
