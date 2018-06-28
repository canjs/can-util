'use strict';

var events = require("../events");
var canDev = require('can-log/dev/dev');

/**
 * @module {events} can-util/dom/events/enter/enter enter
 * @parent deprecated
 *
 * Watches for when enter keys are pressed on a given element
 *
 * ```js
 * var events = require("can-util/dom/events/events");
 * var input = document.createElement("input");
 *
 * function enterEventHandler() {
 * 	console.log("enter key pressed");
 * }
 *
 * events.addEventHandler.call(input, "enter", enterEventHandler);
 * events.dispatch.call(input, {
 *   type: 'keyup',
 *   keyCode: keyCode
 * });
 *
 *
 */

 //!steal-remove-start
if (process.env.NODE_ENV !== 'production') {
	canDev.warn('dom/events/enter/enter is deprecated; please use can-event-dom-enter instead: https://github.com/canjs/can-event-dom-enter');
}
 //!steal-remove-end

var addEnter = require('can-event-dom-enter/compat');
addEnter(events);
