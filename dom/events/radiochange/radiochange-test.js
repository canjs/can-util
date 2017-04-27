'use strict';

require('can-util/dom/events/radiochange/');
var domEvents = require('can-util/dom/events/');
var domDispatch = require('can-util/dom/dispatch/');

function fixture () {
	return document.getElementById("qunit-fixture");
}

QUnit = require('steal-qunit');
QUnit.module("can-util/dom/events/radiochange");

test("subscription to an untracked radio should call listener", function () {
	expect(1);
	var listener = document.createElement('input');
	listener.type = 'radio';
	listener.name = 'myfield';
	domEvents.addEventListener.call(listener, 'radiochange', function handler () {
		ok(true, 'called from other element');
		domEvents.removeEventListener.call(listener, 'radiochange', handler);
	});

	var radio = document.createElement('input');
	radio.type = 'radio';
	radio.name = 'myfield';

	fixture().appendChild(listener);
	fixture().appendChild(radio);

	radio.setAttribute('checked', 'checked');
	domDispatch.call(radio, 'change');
});

test("subscription to a tracked radio should call itself", function () {
	expect(1);
	var radio = document.createElement('input');
	radio.type = 'radio';
	radio.name = 'anynamejustsothereisaname';
	domEvents.addEventListener.call(radio, 'radiochange', function handler () {
		ok(true, 'called from self');
		domEvents.removeEventListener.call(radio, 'radiochange', handler);
	});

	fixture().appendChild(radio);

	radio.setAttribute('checked', 'checked');
	domDispatch.call(radio, 'change');
});
