'use strict';

require('./inserted');
var domEvents = require('../events');
var MUTATION_OBSERVER = require('../../mutation-observer/mutation-observer');
var domMutate = require("../../mutate/mutate");
var dev = require('../../../js/dev/dev');

var isProduction = require('../../../test/helpers').isProduction;
var QUnit = require('../../../test/qunit');

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

	if (!isProduction()) {
		test("basic disabled insertion", function (assert) {
			expect(1);

			var done = assert.async();
			var oldlog = dev.warn;
			dev.warn = function (text) {
				dev.warn = oldlog;
				var message = 'can-util/dom/events::dispatch';
				equal(text.slice(0, message.length), message, 'Got expected warning.');
				done();
			};

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
