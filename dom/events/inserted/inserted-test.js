'use strict';

require('./inserted');
var domEvents = require('../events');
var getMutationObserver = require('can-globals/mutation-observer/mutation-observer');
var domMutate = require("../../mutate/mutate");
var dev = require('can-log/dev/dev');

var isProduction = require('../../../test/helpers').isProduction;
var unit = require('../../../test/qunit');

function runTest(name, MUT_OBS) {
	var oldMutObs;
	unit.module(name, {
		setup: function(){
			oldMutObs = getMutationObserver();
			getMutationObserver(MUT_OBS);
		},
		teardown: function(){
			getMutationObserver(oldMutObs);
		}
	});

	unit.test('basic insertion', function (assert) {
		var done = assert.async();
		var div = document.createElement("div");

		domEvents.addEventListener.call(div,"inserted", function(){
			assert.ok(true, "called back");
			done();
		});

		domMutate.appendChild.call(document.getElementById("qunit-fixture"), div);
	});

	if (!isProduction()) {
		unit.test('basic disabled insertion', function (assert) {
			assert.expect(1);

			var done = assert.async();
			var oldlog = dev.warn;
			dev.warn = function (text) {
				dev.warn = oldlog;
				var message = 'can-util/dom/events::dispatch';
				assert.equal(text.slice(0, message.length), message, 'Got expected warning.');
				done();
			};

			var input = document.createElement("input");
			input.disabled = true;

			domEvents.addEventListener.call(input,"inserted", function(){});
			domMutate.appendChild.call(document.getElementById("qunit-fixture"), input);
		});
	}

	unit.test('parent then child inserted - appendChild', function (assert) {
		assert.expect(1);
		var done = assert.async();
		var div = document.createElement("div");

		var span = document.createElement("span");

		domEvents.addEventListener.call(span,"inserted", function(){
			assert.ok(true, "called back");
			done();
		});
		domMutate.appendChild.call(document.getElementById("qunit-fixture"), div);
		domMutate.appendChild.call(div, span);
	});

	unit.test('parent then child inserted in callback - appendChild', function (assert) {
		assert.expect(1);
		var done = assert.async();
		var div = document.createElement("div");

		var span = document.createElement("span");

		domEvents.addEventListener.call(div,"inserted", function(){
			domMutate.appendChild.call(div, span);
		});
		domEvents.addEventListener.call(span,"inserted", function(){
			assert.ok(true, "called back");
			done();
		});
		domMutate.appendChild.call(document.getElementById("qunit-fixture"), div);
	});

}

runTest("can-util/dom/events/inserted - MutationObserver", getMutationObserver());
runTest("can-util/dom/events/inserted - no MutationObserver", null);
