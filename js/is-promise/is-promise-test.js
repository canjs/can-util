var QUnit = require('../../test/qunit');
var isPromise = require('./is-promise');

QUnit.module("can-util/js/is-promise");

QUnit.test("basics", function(){
	QUnit.ok(isPromise({"catch": function(){}, then: function(){}}));
});
