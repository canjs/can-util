var domDispatch = require('can-util/dom/dispatch/');
var domEvents = require('can-util/dom/events/');


QUnit = require('steal-qunit');

QUnit.module("can-util/dom/dispatch");

test("basic synthetic events", function () {
	var div = document.createElement("div");

	domEvents.addEventListener.call(div,"foo", function(){
		ok(true, "called back");
	});

	domDispatch.call(div,"foo");

});

test("synthetic events on disabled element", function () {
	expect(1);
	var input = document.createElement("input");
	input.disabled = true;

	domEvents.addEventListener.call(input, "foo", function(){
		ok(true, "called back");
	});

	document.getElementById("qunit-fixture").appendChild(input);
	domDispatch.call(input, "foo", [], false);
});

test("more complex synthetic events", function () {
	var div = document.createElement("div");
	var arr = [];

	domEvents.addEventListener.call(div,"attributes", function(ev){
		ok(true, "called back");
		equal(ev.something, arr, "got data");
	});


	domDispatch.call(div,{type: "attributes", something: arr}, ["a"]);

});
