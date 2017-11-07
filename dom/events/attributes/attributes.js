'use strict';

var events = require("../events");
var addAttributesEvent = require('can-dom-mutate/events/compat').attributes;
addAttributesEvent(events, 'attributes');

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
