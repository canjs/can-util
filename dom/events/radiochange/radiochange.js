'use strict';

var events = require('../events');
var canDev = require('can-log/dev/dev');

/**
 * @hide
 * @module {events} can-util/dom/events/radiochange/radiochange radiochange
 * @parent deprecated
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

//!steal-remove-start
if (process.env.NODE_ENV !== 'production') {
	canDev.warn('dom/events/radiochange/radiochange is deprecated; please use can-event-dom-radiochange instead: https://github.com/canjs/can-event-dom-radiochange');
}
//!steal-remove-end

var addRadioChange = require('can-event-dom-radiochange/compat');
addRadioChange(events);
