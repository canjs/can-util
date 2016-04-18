require('can-util/dom/events/inserted/');
var domEvents = require('can-util/dom/events/');
var domDispatch = require('can-util/dom/dispatch/');
var domData = require('can-util/dom/data/');
require('can-util/dom/events/delegate/');
var buildFrag = require('can-util/dom/fragment/');

QUnit = require('steal-qunit');

QUnit.module("can-util/dom/events/delegate");


test("basics", 2, function () {
	var frag = buildFrag("<ul><li><span/></li><li></li></ul>");

	var ul = frag.firstChild;

	var handler = function(ev){
		ok(true, "called")
		domEvents.removeDelegateListener.call(ul, "click", "li",handler);
		var dE = domData.get.call(this, "delegateEvents");
		equal(dE, undefined, "data removed");
		domEvents.addDelegateListener.call(ul, "click", "li",handler);
	};
	domEvents.addDelegateListener.call(ul, "click", "li", handler);
	domDispatch.call(ul.firstChild.firstChild,"click");
});
