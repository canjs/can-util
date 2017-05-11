'use strict';

var makeMutationEvent = require("../make-mutation-event/make-mutation-event");

/**
 * @module {events} can-util/dom/events/removed/removed removed
 * @parent can-util/dom/events/events
 *  
 * This event fires when the bound element is detached or destroyed.
 *
 * ```js
 * var events = require("can-util/dom/events/events");
 * require("can-util/dom/events/removed/removed");
 *
 * var foo = document.createElement("div");
 * document.body.appendChild(foo);
 *
 * var log = function() { console.log("removed event fired"); }
 * events.addEventListener.call(foo, "removed", log);
 *
 * document.body.removeChild(foo); // remove event fired
 */
makeMutationEvent("removed", "removedNodes");
