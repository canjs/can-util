'use strict';

var domDispatch = require('./dispatch');
var domEvents = require('../events/events');
var unit = require('../../test/qunit');

unit.module("can-util/dom/dispatch");

unit.test("basic synthetic events", function (assert) {
	var div = document.createElement("div");

	domEvents.addEventListener.call(div,"foo", function(){
		assert.ok(true, "called back");
	});

	domDispatch.call(div,"foo");
});

unit.test("more complex synthetic events", function (assert) {
	var div = document.createElement("div");
	var arr = [];

	domEvents.addEventListener.call(div,"attributes", function(ev){
		assert.ok(true, "called back");
		assert.equal(ev.something, arr, "got data");
	});

	domDispatch.call(div,{type: "attributes", something: arr}, ["a"]);
});
