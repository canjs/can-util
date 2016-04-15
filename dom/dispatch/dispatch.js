var assign = require("../../js/assign/");
var document = require("../document/");

module.exports = function(event, args, bubbles){
	var doc = document();

	var ev = doc.createEvent('HTMLEvents');
	var isString = typeof event === "string";

	// removed / inserted events should not bubble
	ev.initEvent(isString ? event : event.type, bubbles === undefined ? true : bubbles);

	if(!isString) {
		assign(ev, event);
	}
	ev.args = args;
	return this.dispatchEvent(ev);
};
