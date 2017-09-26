'use strict';

require('./removed');
var each = require('../../../js/each/each');
var domEvents = require('../events');
var getMutationObserver = require('can-globals/mutation-observer/mutation-observer');
var domMutate = require("../../mutate/mutate");

var unit = require('../../../test/qunit');

var events = [];
var addEvent = function(el, event, handler){
	domEvents.addEventListener.call(el, event, handler);
	events.push({
		el: el,
		event: event,
		handler: handler
	});
};
var removeEvents = function() {
	if(events.length) {
		each(events, function(ev) {
			domEvents.removeEventListener.call(ev.el, ev.event, ev.handler);
		});
	}
	events = [];
};


QUnit.module("can-util/dom/events/removed", {
	teardown: removeEvents
});

var _MutationObserver = getMutationObserver();
if(_MutationObserver) {
	unit.test('with mutation observer - basic removal - removeChild', function (assert) {
		var done = assert.async();
		var div = document.createElement("div");

		domEvents.addEventListener.call(div,"removed", function(){
			assert.ok(true, "called back");
			done();
		});

		document.getElementById("qunit-fixture").appendChild(div);
		document.getElementById("qunit-fixture").removeChild(div);
	});

	unit.test('with mutation observer - disabled removal - removeChild', function (assert) {
		var done = assert.async();
		var input = document.createElement("removed");
		input.disabled = true;

		domEvents.addEventListener.call(input,"removed", function(){
			assert.ok(true, "called back");
			done();
		});

		document.getElementById("qunit-fixture").appendChild(input);
		document.getElementById("qunit-fixture").removeChild(input);
	});

	unit.test('with mutation observer - basic removal - replaceChild', function (assert) {
		var done = assert.async();
		var div = document.createElement("div");
		var div2 = document.createElement("div");

		domEvents.addEventListener.call(div,"removed", function(){
			assert.ok(true, "called back");
			done();
		});
		document.getElementById("qunit-fixture").appendChild(div);
		document.getElementById("qunit-fixture").replaceChild(div2,div);
	});

	unit.test('with mutation observer - nested removal - removeChild', function (assert) {
		var done = assert.async();
		var div = document.createElement("div");
		var span = document.createElement("span");
		div.appendChild(span);


		domEvents.addEventListener.call(span,"removed", function(){
			assert.ok(true, "called back");
			done();
		});

		document.getElementById("qunit-fixture").appendChild(div);
		document.getElementById("qunit-fixture").removeChild(div);
	});

	unit.test('with mutation observer - move', function (assert) {
		var done = assert.async();
		assert.expect(0);
		var div = document.createElement("div");
		var span = document.createElement("span");
		var p = document.createElement("p");
		div.appendChild(span);
		div.appendChild(p);
		domMutate.appendChild.call(document.getElementById("qunit-fixture"), div);

		addEvent(p, "removed", function(){
			assert.ok(false, "called removed");
		});

		div.insertBefore(p, span);
		done();
	});

	unit.test('with mutation observer - move and remove (#146)', function (assert) {
		var done = assert.async();
		var fixture = document.getElementById("qunit-fixture");
		var div = document.createElement("div");
		var span = document.createElement("span");
		var p = document.createElement("p");
		div.appendChild(span);
		div.appendChild(p);
		domMutate.appendChild.call(fixture, div);

		var div2 = document.createElement("div");
		domMutate.appendChild.call(fixture, div2);

		addEvent(p, "removed", function(){
			assert.ok(false, "called removed");
		});

		addEvent(div2, "removed", function(){
			assert.ok(true, "div removed");
			done();
		});

		div.insertBefore(p, span);
		domMutate.removeChild.call(fixture, div2);
	});

	unit.test('with mutation observer - remaining event handlers fire after one is removed (#236)', function (assert) {
		var done = assert.async();
		var div = document.createElement("div");

		domEvents.addEventListener.call(div,"removed", function (){
			assert.ok(true, "called back");
			done();
		});

		function removeTwo () {}
		domEvents.addEventListener.call(div, "removed", removeTwo);
		domEvents.removeEventListener.call(div, "removed", removeTwo);

		document.getElementById("qunit-fixture").appendChild(div);
		document.getElementById("qunit-fixture").removeChild(div);
	});
}

unit.test('basic removal without mutation observer - removeChild', function (assert) {
	var done = assert.async();
	getMutationObserver(null);

	var div = document.createElement("div");

	domEvents.addEventListener.call(div,"removed", function(){
		assert.ok(true, "called back");
		getMutationObserver(_MutationObserver);
		done();
	});

	domMutate.appendChild.call(document.getElementById("qunit-fixture"), div);
	domMutate.removeChild.call(document.getElementById("qunit-fixture"), div);
});

unit.test('disabled removal without mutation observer - removeChild', function (assert) {
	var done = assert.async();
	getMutationObserver(null);

	var input = document.createElement("input");
	input.disabled = true;

	domEvents.addEventListener.call(input,"removed", function(){
		assert.ok(true, "called back");
		getMutationObserver(_MutationObserver);
		done();
	});

	domMutate.appendChild.call(document.getElementById("qunit-fixture"), input);
	domMutate.removeChild.call(document.getElementById("qunit-fixture"), input);
});

unit.test('basic insertion without mutation observer - replaceChild', function (assert) {
	var done = assert.async();
	getMutationObserver(null);

	var div = document.createElement("div");
	var div2 = document.createElement("div");

	domEvents.addEventListener.call(div,"removed", function(){
		assert.ok(true, "called back");
		getMutationObserver(_MutationObserver);
		done();
	});

	domMutate.appendChild.call(document.getElementById("qunit-fixture"), div);
	domMutate.replaceChild.call(document.getElementById("qunit-fixture"), div2,div);
});
