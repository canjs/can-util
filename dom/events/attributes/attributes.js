'use strict';

var events = require("../events");
var isOfGlobalDocument = require("../../is-of-global-document/is-of-global-document");
var domData = require("../../data/data");
var getMutationObserver = require("../../mutation-observer/mutation-observer");
var assign = require("../../../js/assign/assign");
var domDispatch = require("../../dispatch/dispatch");
var CIDSet = require('../../../js/cid-set/cid-set');

var attributesEventType = 'attributes';

// This flag is used in can-util/dom/attr
// to dispatch the "attributes" event when
// MutationObserver is not supported.
var attributesFlagKey = 'canHasAttributesBindings';

var attributesObserverKey = 'canAttributesObserver';

// We need to track the handlers associated with
// the observer so we know when to disconnect it.
var attributesListenersKey = 'canAttributeListeners';

function isMutationSupported (target) {
	var hasObserver = !!getMutationObserver();
	var isInDocument = isOfGlobalDocument(target);
	return isInDocument && hasObserver;
}

function hasListeners (target) {
	var listeners = domData.get.call(target, attributesListenersKey);
	var hasExistingListeners = listeners && listeners.size > 0;
	return hasExistingListeners;
}

function startObserving (target) {
	if (hasListeners(target)) {
		return;
	}

	if (!isMutationSupported(target)) {
		domData.set.call(target, attributesFlagKey, true);
		return;
	}

	var MutationObserver = getMutationObserver();
	var observer = new MutationObserver(function (mutations) {
		mutations.forEach(function (mutation) {
			var eventData = assign({}, mutation);
			domDispatch.call(target, eventData, [], false);
		});
	});
	observer.observe(target, {
		attributes: true,
		attributeOldValue: true
	});
	domData.set.call(target, attributesObserverKey, observer);
}

function stopObserving (target) {
	if (hasListeners(target)) {
		return;
	}

	domData.clean.call(target, attributesFlagKey);

	var observer = domData.get.call(target, attributesObserverKey);
	if (observer && observer.disconnect) {
		observer.disconnect();
	}
	domData.clean.call(target, attributesObserverKey);
}

function addListener (target, handler) {
	var listeners = domData.get.call(target, attributesListenersKey) || new CIDSet();
	listeners.add(handler);
	domData.set.call(target, attributesListenersKey, listeners);
}

function removeListener (target, handler) {
	var listeners = domData.get.call(target, attributesListenersKey);
	if (listeners) {
		listeners["delete"](handler);
		if (listeners.size <= 0) {
			domData.clean.call(target, attributesListenersKey);
		}
	}
}

var originalAdd = events.addEventListener;
var originalRemove = events.removeEventListener;

/**
 * @module {events} can-util/dom/events/attributes/attributes attributes
 * @parent can-util/dom/events/events
 *
 * Adds a listenable "attributes" event to DOM nodes, which fires when
 * the node's attributes change.
 *
 * ```js
 * var events = require("can-util/dom/events/events");
 * require("can-util/dom/events/attributes/attributes");
 * var el = document.createElement("div");
 *
 * function attributesHandler() {
 * 	console.log("attributes event fired");
 * }
 *
 * events.addEventListener.call(el, "attributes", attributesHandler, false);
 *
 * events.removeEventListener.call(el, "attributes", attributesHandler);
 * ```
 */
events.addEventListener = function(eventName, handler) {
	if(eventName === attributesEventType) {
		startObserving(this);
		addListener(this, handler);
	}
	return originalAdd.apply(this, arguments);
};

events.removeEventListener = function(eventName, handler) {
	if(eventName === attributesEventType) {
		removeListener(this, handler);
		stopObserving(this);
	}
	return originalRemove.apply(this, arguments);
};
