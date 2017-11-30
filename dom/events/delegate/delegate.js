'use strict';

var domEvents = require("../events");
var domData = require("../../data/data");
var domMatches = require("../../matches/matches");
var each = require("../../../js/each/each");
var isEmptyObject = require("../../../js/is-empty-object/is-empty-object");
var canCid = require("can-cid");

var dataName = "delegateEvents";

// Some events do not bubble, so delegating them requires registering the handler in the
// capturing phase.
// http://www.quirksmode.org/blog/archives/2008/04/delegating_the.html
var useCapture = function(eventType) {
	return eventType === 'focus' || eventType === 'blur';
};

/**
 * @module {events} can-util/dom/events/delegate/delegate delegateEvents
 * @parent can-util/dom/events/events
 *
 * Add delegate listeners to DOM events.  Delegated listeners use a selector on an
 * ancestor element to determine when to fire the event for an item.  This can help
 * cases where large numbers of similar DOM nodes are added into a DOM subtree, since
 * event handlers do not have to be attached to each new node.
 *
 * ```js
 * var events = require("can-util/dom/events/events");
 * require("can-util/dom/events/delegate/delegate");
 * var el = document.createElement("div");
 * var sub = document.createElement("div");
 * sub.className = "foo"
 * el.appendChild(sub);
 *
 * function delegateEventsHandler() {
 *  console.log("delegate event fired");
 * }
 *
 * events.addDelegateListener.call(el, "click", ".foo", delegateEventsHandler, false);
 *
 * events.removeDelegateListener.call(el, "click", ".foo", delegateEventsHandler);
 * ```
 */
var handleEvent = function (overrideEventType, ev) {
	var events = domData.get.call(this, dataName);
	var eventTypeEvents = events[overrideEventType || ev.type];
	// contains the element and the handlers to call back
	var matches = [];

	if(eventTypeEvents) {
		var selectorDelegates = [];
		// convert eventTypeEvents from an object to
		// an array.
		each(eventTypeEvents, function(delegates){
			selectorDelegates.push(delegates);
		});

		// walk from the target to the delegate element
		// checking each selector
		var cur = ev.target;
		do {
			selectorDelegates.forEach(function(delegates){
				if (domMatches.call(cur, delegates[0].selector )) {
					matches.push({
						target: cur,
						delegates: delegates
					});
				}
			});
			cur = cur.parentNode;
		} while (cur && cur !== ev.currentTarget);
	}

	// make sure `cancelBubble` is  set
	var oldStopProp = ev.stopPropagation;
	ev.stopPropagation = function() {
		oldStopProp.apply(this, arguments);
		this.cancelBubble = true;
	};

	for(var i = 0; i < matches.length; i++) {
		var match = matches[i];
		var delegates = match.delegates;

		for(var d = 0, dLen = delegates.length; d < dLen; d++) {
			if (delegates[d].handler.call(match.target, ev) === false) {
				return false;
			}
			if (ev.cancelBubble) {
				return;
			}
		}
	}
};

/**
 * @function can-util/dom/events/delegate/delegate.addDelegateListener events.addDelegateListener
 * @parent can-util/dom/events/delegate/delegate
 * @signature `events.addDelegateListener(eventType, selector, handler)`
 * @param {String} eventType The type of the event to virtually bind to delegates
 * @param {String} selector  A CSS selector that matches all intended delegates
 * @param {function(event)} handler   The function to call when the event is dispatched
 *
 * Add an event as in [can-util/dom/events/events.addEventListener addEventListener] but with a selector
 * matching child nodes ("delegates") for which the event should fire.
 *
 * Delegate events are limited to firing in the bubble phase.
 */
domEvents.addDelegateListener = function(eventType, selector, handler) {
	var events = domData.get.call(this, dataName),
		eventTypeEvents;

	if (!events) {
		domData.set.call(this, dataName, events = {});
	}

	// if the first of that event type, bind
	if (!(eventTypeEvents = events[eventType])) {
		eventTypeEvents = events[eventType] = {};

		var delegateHandler = handleEvent.bind(this, eventType);
		domData.set.call(this, canCid(handler), delegateHandler);
		domEvents.addEventListener.call(this, eventType, delegateHandler, useCapture(eventType));
	}

	if (!eventTypeEvents[selector]) {
		eventTypeEvents[selector] = [];
	}

	eventTypeEvents[selector].push({
		handler: handler,
		selector: selector
	});
};

/**
 * @function can-util/dom/events/delegate/delegate.removeDelegateListener events.removeDelegateListener
 * @parent can-util/dom/events/delegate/delegate
 * @signature `events.removeDelegateListener(eventType, selector, handler)`
 * @param {String} eventType The type of the event to unbind
 * @param {String} selector  A CSS selector that matches a delegate selector added for this event type
 * @param {function(event)} handler   The function bound as handler when the listener was added
 *
 * Remove a delegated event added by in [can-util/dom/delegate/delegate.addDelegateListener addDelegateListener]
 */
domEvents.removeDelegateListener = function(eventType, selector, handler) {
	var events = domData.get.call(this, dataName);

	if (events && events[eventType] && events[eventType][selector]) {
		var eventTypeEvents = events[eventType],
			delegates = eventTypeEvents[selector],
			i = 0;

		// remove the matching eventType/selector/handler
		while (i < delegates.length) {
			if (delegates[i].handler === handler) {
				delegates.splice(i, 1);
			} else {
				i++;
			}
		}
		// if there are no more selectors, remove the selector
		if(delegates.length === 0) {
			delete eventTypeEvents[selector];
			// if there are no more events for that eventType, unbind
			if(isEmptyObject(eventTypeEvents)) {
				var delegateHandler = domData.get.call(this, canCid(handler));
				domEvents.removeEventListener.call(this, eventType, delegateHandler, useCapture(eventType));
				delete events[eventType];
				if(isEmptyObject(events)) {
					domData.clean.call(this, dataName);
				}
			}
		}
	}
};
