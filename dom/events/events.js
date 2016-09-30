var assign = require("../../js/assign/assign");
var _document = require("../document/document");

/**
 * @module {{}} can-util/dom/events/events events
 * @parent can-util/dom
 * @description Allows you to listen to a domEvent and special domEvents as well as dispatch domEvents.
 *
 * ```js
 * var domEvents = require("can-util/dom/events/events");
 * ```
 */
module.exports = {
	addEventListener: function(){
		this.addEventListener.apply(this, arguments);
	},
	removeEventListener: function(){
		this.removeEventListener.apply(this, arguments);
	},
	canAddEventListener: function(){
		return (this.nodeName && (this.nodeType === 1 || this.nodeType === 9)) || this === window;
	},
	dispatch: function(event, args, bubbles){
		var doc = _document();

		var ev = doc.createEvent('HTMLEvents');
		var isString = typeof event === "string";

		// removed / inserted events should not bubble
		ev.initEvent(isString ? event : event.type, bubbles === undefined ? true : bubbles, false);

		if(!isString) {
			assign(ev, event);
		}
		ev.args = args;
		return this.dispatchEvent(ev);
	}
};
