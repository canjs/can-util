var assign = require("../../js/assign/");
var document = require("../document/");

module.exports = function(event, args, bubbles){
	var doc = document();

	var ev = doc.createEvent('HTMLEvents');

	// removed / inserted events should not bubble
	ev.initEvent(event, bubbles === undefined ? true : bubbles);

	ev.args = args;
	return this.dispatchEvent(ev);
};
