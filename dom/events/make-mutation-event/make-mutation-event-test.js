var events = require("../events");
var domData = require("../../data/data");
var getMutationObserver = require("can-globals/mutation-observer/mutation-observer");
var makeMutationEvent = require("./make-mutation-event");
var unit = require('../../../test/qunit');

var SPECIAL = "makeMutationEventTestEvent";

if(getMutationObserver()) {
	unit.module("can-util/events/make-mutation-event/make-mutation-event");

	makeMutationEvent(SPECIAL, "addedNodes");

	unit.test("Doesn't add data about DocumentFragments (leak)", function(assert){
		var frag = document.createDocumentFragment();
		frag.appendChild(document.createElement("div"));

		events.addEventListener.call(frag, SPECIAL, Function.prototype);

		var data = domData.get.call(document.documentElement, SPECIAL+"Data");
		var map = data.nodeIdsRespondingToInsert;

		assert.equal(map.size, 0, "No special event data added for a document fragment");
	});
}
