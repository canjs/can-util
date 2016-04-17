var domEvents = require("../events");
var domData = require("../../data/");
var domMatches = require("../../matches/");

domEvents.addDelegateListener = function(selector, eventType, handler) {
	var delegator = function(ev) {
		var matches = [];
		var cur = ev.target;
		do {
			if (domMatches.call(cur, selector)) {
				matches.push(cur);
			}
			cur = cur.parentNode;
		} while (cur && cur !== ev.currentTarget);
		for(var i = 0; i < matches.length; i++) {
			matches[i].call(cur, ev);
		}

	};

	var events = domData.get.call(this, "events"),
		eventTypeEvents;

	if (!events) {
		domData.set.call(this, "events", events = {});
	}

	if (!(eventTypeEvents = events[eventType])) {
		eventTypeEvents = events[eventType] = {};
	}

	if (!eventTypeEvents[selector]) {
		eventTypeEvents[selector] = [];
	}
	eventTypeEvents[selector].push({
		handler: handler,
		delegator: delegator
	});
	element.addEventListener(eventType, delegator, false);
};
