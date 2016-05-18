require('can-util/dom/events/inserted/');
var domEvents = require('can-util/dom/events/');
var MUTATION_OBSERVER = require('can-util/dom/mutation-observer/');
var domMutate = require("can-util/dom/mutate/");

QUnit = require('steal-qunit');

function runTest(name, MUT_OBS) {
	var oldMutObs;
	QUnit.module(name, {
		setup: function(){
			oldMutObs = MUTATION_OBSERVER();
			MUTATION_OBSERVER(MUT_OBS);
		},
		teardown: function(){
			MUTATION_OBSERVER(oldMutObs);
		}
	});


	asyncTest("basic insertion with mutation observer", function () {
		var div = document.createElement("div");

		domEvents.addEventListener.call(div,"inserted", function(){
			ok(true, "called back");
			start();
		});

		domMutate.appendChild.call(document.getElementById("qunit-fixture"), div);
	});
	asyncTest("parent then child inserted - appendChild", function () {
		expect(1);
		var div = document.createElement("div");

		var span = document.createElement("span");

		domEvents.addEventListener.call(span,"inserted", function(){
			ok(true, "called back");
			start();
		});
		domMutate.appendChild.call(document.getElementById("qunit-fixture"), div);
		domMutate.appendChild.call(div, span);
	});

	asyncTest("parent then child inserted in callback - appendChild", function () {
		expect(1);
		var div = document.createElement("div");

		var span = document.createElement("span");

		domEvents.addEventListener.call(div,"inserted", function(){
			domMutate.appendChild.call(div, span);
		});
		domEvents.addEventListener.call(span,"inserted", function(){
			ok(true, "called back");
			start();
		});

		domMutate.appendChild.call(document.getElementById("qunit-fixture"), div);
	});

}

runTest("can-util/dom/events/inserted - MutationObserver", MUTATION_OBSERVER());
runTest("can-util/dom/events/inserted - no MutationObserver", null);
