require('can-util/dom/events/inserted/');
var domEvents = require('can-util/dom/events/');
var getMutationObserver = require('can-util/dom/mutation-observer/');
var domMutate = require("can-util/dom/mutate/");

QUnit = require('steal-qunit');

QUnit.module("can-util/dom/events/inserted");

var _MutationObserver = getMutationObserver();
if(_MutationObserver) {
	asyncTest("basic insertion with mutation observer", function () {
		var div = document.createElement("div");

		domEvents.addEventListener.call(div,"inserted", function(){
			ok(true, "called back");
			start();
		});

		document.getElementById("qunit-fixture").appendChild(div);
	});
	asyncTest("parent then child inserted - appendChild", function () {
		expect(1);
		var div = document.createElement("div");

		var span = document.createElement("span");
		domEvents.addEventListener.call(span,"inserted", function(){
			ok(true, "called back");
			start();
		});

		document.getElementById("qunit-fixture").appendChild(div);

		div.appendChild(span);
	});
}

asyncTest("basic insertion without mutation observer", function(){
	getMutationObserver(null);

	var div = document.createElement("div");

	domEvents.addEventListener.call(div,"inserted", function(){
		ok(true, "called back");
		getMutationObserver(_MutationObserver);
		start();
	});

	domMutate.appendChild.call(document.getElementById("qunit-fixture"), div);
});
