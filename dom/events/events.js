/**
 * @module {{}} can-util/dom/events/events events
 * @parent can-util/dom
 * @description Allows you to listen to a domEvent and special domEvents.
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
	}
};
