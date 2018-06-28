'use strict';

var getDocument = require('can-globals/document/document');
var isBrowserWindow = require('can-globals/is-browser-window/is-browser-window');
var isPlainObject = require('../../js/is-plain-object/is-plain-object');
var fixSyntheticEventsOnDisabled = false;
var dev = require('can-log/dev/dev');
var namespace = require("can-namespace");

function isDispatchingOnDisabled(element, ev) {
	var isInsertedOrRemoved = isPlainObject(ev) ? (ev.type === 'inserted' || ev.type === 'removed') : (ev === 'inserted' || ev === 'removed');
	var isDisabled = !!element.disabled;
	return isInsertedOrRemoved && isDisabled;
}

/**
 * @module {{}} can-util/dom/events/events events
 * @parent can-util/dom
 * @description Allows you to listen to a domEvent and special domEvents as well as dispatch domEvents.
 *
 * ```js
 * var domEvents = require("can-util/dom/events/events");
 * ```
 */
module.exports = namespace.events = {
	addEventListener: function(){
		this.addEventListener.apply(this, arguments);
	},
	removeEventListener: function(){
		this.removeEventListener.apply(this, arguments);
	},
	canAddEventListener: function(){
		return (this.nodeName && (this.nodeType === 1 || this.nodeType === 9)) || this === window;
	},
	dispatch: function(event, args, bubbles){
		var ret;
		var dispatchingOnDisabled = fixSyntheticEventsOnDisabled && isDispatchingOnDisabled(this, event);

		var doc = this.ownerDocument || getDocument();
		var ev = doc.createEvent('HTMLEvents');
		var isString = typeof event === "string";

		// removed / inserted events should not bubble
		ev.initEvent(isString ? event : event.type, bubbles === undefined ? true : bubbles, false);

		if(!isString) {
			for (var prop in event) {
				if (ev[prop] === undefined) {
					ev[prop] = event[prop];
				}
			}
		}

		// ignore events from feature detection below
		if(this.disabled === true && ev.type !== 'fix_synthetic_events_on_disabled_test') {
			//!steal-remove-start
			if (process.env.NODE_ENV !== 'production') {
				dev.warn(
					"can-util/dom/events::dispatch: Dispatching a synthetic event on a disabled is " +
					"problematic in FireFox and Internet Explorer. We recommend avoiding this if at " +
					"all possible. see https://github.com/canjs/can-util/issues/294"
				);
			}
			//!steal-remove-end
		}

		ev.args = args;
		if(dispatchingOnDisabled) {
			this.disabled = false;
		}
		ret = this.dispatchEvent(ev);
		if(dispatchingOnDisabled) {
			this.disabled = true;
		}
		return ret;
	}
};

// In FireFox, dispatching a synthetic event on a disabled element throws an error.
// Other browsers, like IE 10 do not dispatch synthetic events on disabled elements at all.
// This determines if we have to work around that when dispatching events.
// https://bugzilla.mozilla.org/show_bug.cgi?id=329509
(function() {
	if(!isBrowserWindow()) {
		return;
	}

	var testEventName = 'fix_synthetic_events_on_disabled_test';
	var input = document.createElement("input");
	input.disabled = true;
	var timer = setTimeout(function() {
		fixSyntheticEventsOnDisabled = true;
	}, 50);
	var onTest = function onTest (){
		clearTimeout(timer);
		module.exports.removeEventListener.call(input, testEventName, onTest);
	};
	module.exports.addEventListener.call(input, testEventName, onTest);
	try {
		module.exports.dispatch.call(input, testEventName, [], false);
	} catch(e) {
		onTest();
		fixSyntheticEventsOnDisabled = true;
	}
})();
