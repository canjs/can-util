'use strict';

/*!
 * Based on jQuery v3.2.1 https://jquery.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 */

var domEvents = require("../events"),
	singleRef = require("../../../js/single-reference/single-reference"),
	cid = require("../../../js/cid/get-cid");

// Some mouse/pointer events do not bubble so we derive these events from other
// bubbling events so they work with delegated listeners

var eventMap = {
		mouseenter: "mouseover",
		mouseleave: "mouseout",
		pointerenter: "pointerover",
		pointerleave: "pointerout"
	},
	classMap = {
		mouseenter: "MouseEvent",
		mouseleave: "MouseEvent",
		pointerenter: "PointerEvent",
		pointerleave: "PointerEvent"
	},
	_addDelegateListener = domEvents.addDelegateListener,
	_removeDelegateListener = domEvents.removeDelegateListener;


domEvents.addDelegateListener = function(eventType, selector, handler) {
	if (eventMap[eventType] !== undefined) {
		var origHandler = handler,
			origType = eventType;

		eventType = eventMap[eventType];
		handler = function(event) {
			var target = this,
				related = event.relatedTarget;

			// For mouseenter/leave call the handler if related is outside the target.
			// No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !target.contains(related)) ) {
				// get new event with correct event type
				var eventClass = classMap[origType];

				if (eventClass === 'MouseEvent') {
					var newEv = document.createEvent(eventClass);
					newEv.initMouseEvent(origType, false, false, event.view, event.detail, event.screenX, event.screenY,
						event.clientX, event.clientY, event.ctrlKey, event.altKey, event.shiftKey, event.metaKey, event.button,
						event.relatedTarget);
					event = newEv;
				} else if (eventClass === 'PointerEvent') {
					event = new PointerEvent(origType, event);
				}

				return origHandler.call(this, event);
			}
		};

		singleRef.set(origHandler, cid(this)+eventType, handler);
	}

	_addDelegateListener.call(this, eventType, selector, handler);
};

domEvents.removeDelegateListener = function(eventType, selector, handler) {
	if (eventMap[eventType] !== undefined) {
		eventType = eventMap[eventType];
		handler = singleRef.getAndDelete(handler, cid(this)+eventType);
	}

	_removeDelegateListener.call(this, eventType, selector, handler);
};
