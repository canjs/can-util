'use strict';

require('can-util/dom/events/removed/');
var each = require('can-util/js/each/');
var domEvents = require('can-util/dom/events/');
var getMutationObserver = require('can-util/dom/mutation-observer/');
var domMutate = require("can-util/dom/mutate/");

QUnit = require('steal-qunit');

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
	asyncTest("with mutation observer - basic removal - removeChild", function () {
		var div = document.createElement("div");

		domEvents.addEventListener.call(div,"removed", function(){
			ok(true, "called back");
			start();
		});

		document.getElementById("qunit-fixture").appendChild(div);
		document.getElementById("qunit-fixture").removeChild(div);
	});

	asyncTest("with mutation observer - disabled removal - removeChild", function () {
		var input = document.createElement("removed");
		input.disabled = true;

		domEvents.addEventListener.call(input,"removed", function(){
			ok(true, "called back");
			start();
		});

		document.getElementById("qunit-fixture").appendChild(input);
		document.getElementById("qunit-fixture").removeChild(input);
	});

	asyncTest("with mutation observer - basic removal - replaceChild", function () {
		var div = document.createElement("div");
		var div2 = document.createElement("div");

		domEvents.addEventListener.call(div,"removed", function(){
			ok(true, "called back");
			start();
		});
		document.getElementById("qunit-fixture").appendChild(div);
		document.getElementById("qunit-fixture").replaceChild(div2,div);
	});

	asyncTest("with mutation observer - nested removal - removeChild", function () {
		var div = document.createElement("div");
		var span = document.createElement("span");
		div.appendChild(span);

		
		domEvents.addEventListener.call(span,"removed", function(){
			ok(true, "called back");
			start();
		});

		document.getElementById("qunit-fixture").appendChild(div);
		document.getElementById("qunit-fixture").removeChild(div);
	});

	asyncTest("with mutation observer - move", function () {
		expect(0);
		var div = document.createElement("div");
		var span = document.createElement("span");
		var p = document.createElement("p");
		div.appendChild(span);
		div.appendChild(p);
		domMutate.appendChild.call(document.getElementById("qunit-fixture"), div);
		
		addEvent(p, "removed", function(){
			ok(false, "called removed");
		});

		div.insertBefore(p, span);
		start();
	});

	asyncTest("with mutation observer - move and remove (#146)", function () {
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
			ok(false, "called removed");
		});

		addEvent(div2, "removed", function(){
			ok(true, "div removed");
			start();
		});

		div.insertBefore(p, span);
		domMutate.removeChild.call(fixture, div2);
	});

	asyncTest("with mutation observer - remaining event handlers fire after one is removed (#236)", function () {
		var div = document.createElement("div");

		domEvents.addEventListener.call(div,"removed", function (){
			ok(true, "called back");
			start();
		});

		function removeTwo () {}
		domEvents.addEventListener.call(div, "removed", removeTwo);
		domEvents.removeEventListener.call(div, "removed", removeTwo);

		document.getElementById("qunit-fixture").appendChild(div);
		document.getElementById("qunit-fixture").removeChild(div);
	});
}

asyncTest("basic removal without mutation observer - removeChild", function(){
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

asyncTest("disabled removal without mutation observer - removeChild", function(){
	getMutationObserver(null);

	var input = document.createElement("input");
	input.disabled = true;

	domEvents.addEventListener.call(input,"removed", function(){
		ok(true, "called back");
		getMutationObserver(_MutationObserver);
		start();
	});

	domMutate.appendChild.call(document.getElementById("qunit-fixture"), input);
	domMutate.removeChild.call(document.getElementById("qunit-fixture"), input);
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
