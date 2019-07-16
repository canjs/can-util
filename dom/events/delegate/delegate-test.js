'use strict';

var domEvents = require('../events');
var domData = require('../../data/data');
var buildFrag = require('../../fragment/fragment');
var domDispatch = require('../../dispatch/dispatch');
require('../inserted/inserted');
require('./delegate');
require('./enter-leave');
require('../enter/enter');

var QUnit = require('../../../test/qunit');
var isServer = require('../../../test/helpers').isServer;

/*
	can-simple-dom does not support HTMLElement.matches(),
	which is used to compare selectors. Without matches(),
	delegate events won't work. E.g. "li" cannot be compared.
*/
var supportsMatchesMethod = !isServer();

QUnit.module("can-util/dom/events/delegate");

if (supportsMatchesMethod) {
	QUnit.test("basics", 2, function(assert) {
		var done = assert.async();
		var frag = buildFrag("<ul><li><span/></li><li></li></ul>");
		var ul = frag.firstChild;
		var parent = document.getElementById('qunit-fixture');

		parent.appendChild(ul);

		var handler = function(ev){
			assert.ok(true, "called");
			domEvents.removeDelegateListener.call(ul, "click", "li", handler);
			var dE = domData.get.call(this, "delegateEvents");
			assert.equal(dE, undefined, "data removed");
			done();
		};
		domEvents.addDelegateListener.call(ul, "click", "li", handler);
		domDispatch.call(ul.firstChild.firstChild,"click");
	});

	QUnit.test("can call removeDelegateListener without having previously called addDelegateListener", 1, function(assert) {
		try {
			var ul = document.createElement("ul");
			domEvents.removeDelegateListener.call(ul, "click", "li", function(){});
			assert.ok(true, "Calling removeDelegateListener does not throw");
		} catch(er) {
			assert.ok(false, "Calling removeDelegateListener throws");
		}
	});

	QUnit.test("focus", 2, function(assert) {
		var done = assert.async();
		var frag = buildFrag("<div><input type='text'></div>");

		var div = frag.firstChild;

		document.getElementById('qunit-fixture').appendChild(div);

		var handler = function(ev){
			assert.ok(true, "called");
			domEvents.removeDelegateListener.call(div, "focus", "input", handler);
			var dE = domData.get.call(this, "delegateEvents");
			assert.equal(dE, undefined, "data removed");
			done();
		};
		domEvents.addDelegateListener.call(div, "focus", "input", handler);
		domDispatch.call(div.firstChild, "focus", [], false);
	});

	QUnit.test("blur", 2, function(assert) {
		var done = assert.async();
		var frag = buildFrag("<div><input type='text'></div>");

		var div = frag.firstChild;

		document.getElementById('qunit-fixture').appendChild(div);

		var handler = function(ev){
			assert.ok(true, "called");
			domEvents.removeDelegateListener.call(div, "blur", "input", handler);
			var dE = domData.get.call(this, "delegateEvents");
			assert.equal(dE, undefined, "data removed");
			done();
		};
		domEvents.addDelegateListener.call(div, "blur", "input", handler);
		domDispatch.call(div.firstChild, "blur", [], false);
	});

	QUnit.test("mouseenter", 3, function(assert) {
		var done = assert.async();

		var frag = buildFrag("<div><button></button></div>"),
		div = frag.firstChild;

		document.getElementById('qunit-fixture').appendChild(div);

		var handler = function(ev) {
			assert.ok(true, "called");
			assert.equal(ev.type, 'mouseenter', 'event in handler has delegated event type');
			domEvents.removeDelegateListener.call(div, 'mouseenter', "button", handler);
			var dE = domData.get.call(this, "delegateEvents");
			assert.equal(dE, undefined, "data removed");
			done();
		};
		domEvents.addDelegateListener.call(div, "mouseenter", "button", handler);

		// dispatch bubbling mouseover since it's being coerced into mouseenter
		domDispatch.call(div.firstChild, {
			type: "mouseover",
			view: window,
			relatedTarget: div
		}, [], true);
	});

	QUnit.test("delegated custom events", 2, function(assert) {
		var done = assert.async();
		var frag = buildFrag("<div><input type='text'></div>");

		var div = frag.firstChild;

		document.getElementById('qunit-fixture').appendChild(div);

		var handler = function(ev){
			assert.ok(true, "called");
			domEvents.removeDelegateListener.call(div, "enter", "input", handler);
			var dE = domData.get.call(this, "delegateEvents");
			assert.equal(dE, undefined, "data removed");
			done();
		};
		domEvents.addDelegateListener.call(div, "enter", "input", handler);
		domDispatch.call(div.firstChild, {type: "keyup", keyCode: 13}, [], true);
	});
}
