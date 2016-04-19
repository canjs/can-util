require('can-util/dom/events/removed/');
var domEvents = require('can-util/dom/events/');
var getMutationObserver = require('can-util/dom/mutation-observer/');
var domMutate = require("can-util/dom/mutate/");

QUnit = require('steal-qunit');

QUnit.module("can-util/dom/events/removed");

var _MutationObserver = getMutationObserver();
if(_MutationObserver) {
	asyncTest("basic insertion with mutation observer - removeChild", function () {
		var div = document.createElement("div");

		domEvents.addEventListener.call(div,"removed", function(){
			ok(true, "called back");
			start();
		});

		document.getElementById("qunit-fixture").appendChild(div);
		document.getElementById("qunit-fixture").removeChild(div);
	});

	asyncTest("basic insertion with mutation observer - replaceChild", function () {
		var div = document.createElement("div");
		var div2 = document.createElement("div");

		domEvents.addEventListener.call(div,"removed", function(){
			ok(true, "called back");
			start();
		});
		document.getElementById("qunit-fixture").appendChild(div);
		document.getElementById("qunit-fixture").replaceChild(div2,div);
	});
}

asyncTest("basic insertion without mutation observer - removeChild", function(){
	getMutationObserver(null);

	var div = document.createElement("div");

	domEvents.addEventListener.call(div,"removed", function(){
		ok(true, "called back");
		getMutationObserver(_MutationObserver);
		start();
	});

	domMutate.appendChild.call(document.getElementById("qunit-fixture"), div);
	domMutate.removeChild.call(document.getElementById("qunit-fixture"), div);
});

asyncTest("basic insertion without mutation observer - replaceChild", function(){
	getMutationObserver(null);

	var div = document.createElement("div");
	var div2 = document.createElement("div");

	domEvents.addEventListener.call(div,"removed", function(){
		ok(true, "called back");
		getMutationObserver(_MutationObserver);
		start();
	});

	domMutate.appendChild.call(document.getElementById("qunit-fixture"), div);
	domMutate.replaceChild.call(document.getElementById("qunit-fixture"), div2,div);
});
