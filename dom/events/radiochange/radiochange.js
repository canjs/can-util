'use strict';

var events = require('../events');
var canDev = require('../../../js/dev/dev');

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

 //!steal-remove-start
 canDev.warn('dom/events/radiochange/radiochange is deprecated; please use can-event-radiochange instead: https://github.com/canjs/can-event-radiochange');
 //!steal-remove-end

require('can-event-radiochange/override').override(events);
