'use strict';

var domEvents = require("../events");

// Some mouse/pointer events do not bubble so we derive these events from other
// bubbling events so they work with delegated listeners

var eventMap = {
    mouseenter: "mouseover",
    mouseleave: "mouseout",
    pointerenter: "pointerover",
    pointerleave: "pointerout"
  },
  _addDelegateListener = domEvents.addDelegateListener,
  _removeDelegateListener = domEvents.removeDelegateListener;


domEvents.addDelegateListener = function(eventType, selector, handler) {
  if (eventMap[eventType] !== undefined) {
    var origHandler = handler;

    this._derivedHandlers = this._derivedHandlers || {};

    eventType = eventMap[eventType];
    handler = function(event) {
      var target = this,
        related = event.relatedTarget;

      // For mouseenter/leave call the handler if related is outside the target.
      // No relatedTarget if the mouse left/entered the browser window
      if ( !related || (related !== target && !target.contains(related)) ) {
        return origHandler.call(this, event);
      }
    };
    this._derivedHandlers[origHandler] = handler;
  }

  _addDelegateListener.call(this, eventType, selector, handler);
};

domEvents.removeDelegateListener = function(eventType, selector, handler) {
  if (eventMap[eventType] !== undefined) {
    eventType = eventMap[eventType];
    handler = this._derivedHandlers[handler];
  }

  _removeDelegateListener.call(this, eventType, selector, handler);
};