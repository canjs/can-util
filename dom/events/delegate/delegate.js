var domEvents = require("../events");
var domData = require("../../data/data");
var domMatches = require("../../matches/matches");
var each = require("../../../js/each/each");
var isEmptyObject = require("../../../js/is-empty-object/is-empty-object");

var dataName = "delegateEvents";


var handleEvent = function(ev){
	var events = domData.get.call(this, dataName);
	var eventTypeEvents = events[ev.type];
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
			if( delegates[d].handler.call(match.target, ev) === false) {
				return false;
			}
			if (ev.cancelBubble) {
                return;
            }
		}
	}
};

domEvents.addDelegateListener = function(eventType, selector, handler) {


	var events = domData.get.call(this, dataName),
		eventTypeEvents;

	if (!events) {
		domData.set.call(this, dataName, events = {});
	}

	// if the first of that event type, bind
	if (!(eventTypeEvents = events[eventType])) {
		eventTypeEvents = events[eventType] = {};
		domEvents.addEventListener.call(this, eventType, handleEvent, false);
	}

	if (!eventTypeEvents[selector]) {
		eventTypeEvents[selector] = [];
	}

	eventTypeEvents[selector].push({
		handler: handler,
		selector: selector
	});

};

domEvents.removeDelegateListener = function(eventType, selector, handler) {
	var events = domData.get.call(this, dataName);

	if (events[eventType] && events[eventType][selector]) {
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
				domEvents.removeEventListener.call(this, eventType, handleEvent, false);
				delete events[eventType];
				if(isEmptyObject(events)) {
					domData.clean.call(this, dataName);
				}
			}
		}
	}
};
