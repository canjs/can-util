'use strict';

require('can-util/dom/events/inserted/');
var domEvents = require('can-util/dom/events/');
var MUTATION_OBSERVER = require('can-util/dom/mutation-observer/');
var domMutate = require("can-util/dom/mutate/");
var dev = require('can-util/js/dev/');

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

	asyncTest("basic insertion", function () {
		var div = document.createElement("div");

		domEvents.addEventListener.call(div,"inserted", function(){
			ok(true, "called back");
			start();
		});

		domMutate.appendChild.call(document.getElementById("qunit-fixture"), div);
	});

	if (System.env.indexOf('production') < 0) {
		asyncTest("basic disabled insertion", function () {
			var oldlog = dev.warn;
			var message = 'can-util/dom/events::dispatch';

			var thisTest = QUnit.config.current;
			dev.warn = function(text) {
				if(QUnit.config.current === thisTest) {
					equal(text.slice(0, message.length), message, 'Got expected warning.');
					start();

					dev.warn = oldlog;
				}
			};

			expect(1);
			var input = document.createElement("input");
			input.disabled = true;

			domEvents.addEventListener.call(input,"inserted", function(){});
			domMutate.appendChild.call(document.getElementById("qunit-fixture"), input);
		});
	}

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
