'use strict';

var domEvents = require("../events/events");
var namespace = require("can-namespace");

/**
 * @module {function} can-util/dom/dispatch/dispatch dispatch
 * @parent can-util/dom
 * @signature `dispatch.call(el, event, args, bubbles)`
 *
 * Dispatch an event on an element.
 *
 * @param {Object|String} event An object specifies options applied to this event.
 * @param {Array} [args] Arguments passed into this event.
 * @param {Boolean} [bubbles=true] Specifies whether this event should bubble (by default it will).
 */

module.exports = namespace.dispatch = function() {
	return domEvents.dispatch.apply(this, arguments);
};
