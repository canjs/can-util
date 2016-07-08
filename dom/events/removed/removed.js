var makeMutationEvent = require("../make-mutation-event/make-mutation-event");

/**
 * @module {events} can-util/dom/events/removed/removed removed
 * @parent can-util/dom/events/events
 *  
 * This event fires when descendant elements of the bound element are detached
 * or destroyed.
 *
 * ```js
 * var events = require("can-util/dom/events/events");
 * require("can-util/dom/events/removed/removed");
 *
 * var foo = document.createElement("div");
 * var log = function() { console.log("removed event fired"); }
 * events.addEventListener(foo, "removed", log);
 */
makeMutationEvent("removed", "removedNodes");
