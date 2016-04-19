var isPromise = require('./is-promise');

QUnit.module("can-util/js/is-promise");

test("basics", function(){
	ok(isPromise({"catch": function(){}, then: function(){}}));
});
