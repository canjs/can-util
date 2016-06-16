var assign = require("../../js/assign/assign");
var _document = require("../document/document");

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

module.exports = function(event, args, bubbles){
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
};
