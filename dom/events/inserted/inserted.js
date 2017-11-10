'use strict';

var makeMutationEvent = require("../make-mutation-event/make-mutation-event");

/**
 * @module {events} can-util/dom/events/inserted/inserted inserted
 * @parent can-util/dom/events/events
 *  
 * This event fires when the bound element is added to the DOM.
 *
 * ```js
 * var events = require("can-util/dom/events/events");
 * require("can-util/dom/events/inserted/inserted");
 *
 * var foo = document.createElement("div");
 *
 * var log = function() { console.log("inserted event fired"); }
 * events.addEventListener.call(foo, "inserted", log);
 *
 * document.body.appendChild(foo); // inserted event fired
 */
makeMutationEvent("inserted", "addedNodes");
