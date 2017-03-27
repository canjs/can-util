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
		var ret;
		var dispatchingOnDisabled = this.disabled;

		var ev = doc.createEvent('HTMLEvents');
		var isString = typeof event === "string";

		// removed / inserted events should not bubble
		ev.initEvent(isString ? event : event.type, bubbles === undefined ? true : bubbles, false);

		if(!isString) {
			assign(ev, event);
		}
		ev.args = args;
		// In FireFox, dispatching an event on a disabled element throws an error.
		// So ensure the mutatedNode is not disabled.
		// https://bugzilla.mozilla.org/show_bug.cgi?id=329509
		if(dispatchingOnDisabled) {
			this.disabled = false;
		}
		ret = this.dispatchEvent(ev);
		if(dispatchingOnDisabled) {
			this.disabled = true;
		}
		return ret;
	}
};
