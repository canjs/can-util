require('can-util/dom/events/inserted/');
var domEvents = require('can-util/dom/events/');
var domDispatch = require('can-util/dom/dispatch/');
require('can-util/dom/events/delegate/');
var buildFrag = require('can-util/dom/fragment/');

QUnit = require('steal-qunit');

QUnit.module("can-util/dom/events/delegate");


test("basics", function () {
	var frag = buildFrag("<ul><li><span/></li><li></li></ul>");

	var ul = frag.firstChild;

	var handler = function(){
		equal(ev.currentTarget, ul.first)
	};
	domEvents.addDelegateListener("li","click", handler);
});
