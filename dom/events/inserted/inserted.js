var makeMutationEvent = require("../make-mutation-event/make-mutation-event");

/**
 * @module {events} can-util/dom/events/inserted/inserted inserted
 * @parent can-util/dom/events/events
 *  
 * This event fires when nodes are added as descendants of the attached element
 *
 * ```js
 * var events = require("can-util/dom/events/events");
 * require("can-util/dom/events/inserted/inserted");
 *
 * var foo = document.createElement("div");
 * var log = function() { console.log("inserted event fired"); }
 * events.addEventListener(foo, "inserted", log);
 */
makeMutationEvent("inserted", "addedNodes");
