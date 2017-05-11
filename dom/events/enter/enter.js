'use strict';

var domEvents = require("../events");
var singleReference = require("../../../js/single-reference/single-reference");
var CID = require("../../../js/cid/get-cid");

/**
 * @module {events} can-util/dom/events/enter/enter enter
 * @parent can-util/dom/events/events
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

var origAddEvt = domEvents.addEventListener;
domEvents.addEventListener = function(eventName, handler){
   if(eventName === "enter") {
       var boundHandler = function(ev){
           if (ev.keyCode === 13 || ev.key === "Enter") {
               return handler.call(this, ev);
           }
       };
       singleReference.set(handler, CID(this) + eventName, boundHandler);
       origAddEvt.call(this, "keyup", boundHandler);
   } else {
       origAddEvt.apply(this, arguments);
   }
};

var origRemoveEvt = domEvents.removeEventListener;
domEvents.removeEventListener = function(eventName, handler){
   if(eventName === "enter") {
       var relatedHandler = singleReference.getAndDelete(handler, CID(this) + eventName);
       origRemoveEvt.call(this, "keyup", relatedHandler);
   } else {
       origRemoveEvt.apply(this, arguments);
   }
};
