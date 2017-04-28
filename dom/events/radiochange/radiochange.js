'use strict';

var events = require('../events');
var domData = require('../../data/data');
var getDocument = require('../../document/document');
var domDispatch = require('../../dispatch/dispatch');
var CIDMap = require('../../../js/cid-map/cid-map');

var originalAdd = events.addEventListener;
var originalRemove = events.removeEventListener;

var radiochangeEventName = 'radiochange';
var registryName = 'canradiochangeRegistry';
var listenerName = 'canradiochangeListener';

function registry (root) {
	var registryMap = domData.get.call(root, registryName);
	if (!registryMap) {
		registryMap = new CIDMap();
		domData.set.call(root, registryName, registryMap);
	}
	return registryMap;
}

function findParentForm (el) {
	while (el) {
		if (el.nodeName === 'FORM') {
			break;
		}
		el = el.parentNode;
	}
	return el;
}

function shouldReceiveEventFromRadio (source, dest) {
	// Must have the same name attribute and parent form
	var name = source.getAttribute('name');
	return (
		name &&
		name === dest.getAttribute('name') &&
		findParentForm(source) === findParentForm(dest)
	);
}

function isRadioInput (el) {
	return el.nodeName === 'INPUT' && el.type === 'radio';
}

function dispatch (root, target) {
	var registryMap = registry(root);
	var event = {type: radiochangeEventName};
	registryMap.forEach(function (el) {
		if (shouldReceiveEventFromRadio(target, el)) {
			domDispatch.call(el, event, [], false);
		}
	});
}

function attachRootListener (root) {
	var listener = domData.get.call(root, listenerName);
	if (listener) {
		return;
	}
	var newListener = function (event) {
		var target = event.target;
		if (isRadioInput(target)) {
			dispatch(root, target);
		}
	};
	events.addEventListener.call(root, 'change', newListener);
	domData.set.call(root, listenerName, newListener);
}

function detachRootListener (root) {
	var listener = domData.get.call(root, listenerName);
	if (!listener) {
		return;
	}
	events.removeEventListener.call(root, 'change', listener);
	domData.clean.call(root, listenerName);
}

function addListener (root, el) {
	if (!isRadioInput(el)) {
		throw new Error('Listeners for "radiochange" must be radio inputs');
	}
	registry(root).set(el, el);
	attachRootListener(root);
}

function removeListener (root, el) {
	registry(root).delete(el);
	if (registry.size === 0) {
		detachRootListener(root);
	}
}

/**
 * @hide
 * @module {events} can-util/dom/events/radiochange/radiochange radiochange
 * @parent can-util/dom/events/events
 *
 * Adds a listenable "radiochange" event to DOM nodes, which fires when
 * any radio input changes.
 *
 * ```js
 * var events = require("can-util/dom/events/events");
 * require("can-util/dom/events/radiochange/radiochange");
 * var el = document.createElement("div");
 *
 * function radiochangeHandler() {
 * 	console.log("radiochange event fired");
 * }
 *
 * events.addEventListener.call(el, "radiochange", radiochangeHandler, false);
 *
 * events.removeEventListener.call(el, "radiochange", radiochangeHandler);
 * ```
 */
events.addEventListener = function (eventName) {
	if (eventName === radiochangeEventName) {
		var root = getDocument().documentElement;
		addListener(root, this);
	}
	return originalAdd.apply(this, arguments);
};

events.removeEventListener = function(eventName){
	if (eventName === radiochangeEventName) {
		var root = getDocument().documentElement;
		removeListener(root, this);
	}
	return originalRemove.apply(this, arguments);
};
