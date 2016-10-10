var QUnit = require('../../test/qunit');
var isPromise = require('./is-promise');

QUnit.module("can-util/js/is-promise");

QUnit.test("basics", function() {	
	QUnit.ok(!isPromise({}), "Object is not a promise");
	QUnit.ok(!isPromise({ catch: function(){}, then: function(){} }), "function with then and catch is not a Promise");
	QUnit.ok(isPromise( new Promise(function(){})), "a new Promise() is a Promise");

	var isNode = typeof process === "object" && {}.toString.call(process) === "[object process]";

	if (!isNode) {
		var fixture = document.getElementById('qunit-fixture');
		var iFrame = document.createElement('IFRAME');
		fixture.appendChild(iFrame);
		var NativePromise = iFrame.contentWindow.Promise;
		fixture.removeChild(iFrame);
		
		if(NativePromise) {
			QUnit.ok(isPromise(new NativePromise(function(){})), "Native Promise is a Promise");
		}
	}
});
