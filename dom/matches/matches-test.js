'use strict';

var matches = require("./matches");

QUnit = require("steal-qunit");

QUnit.module("can-util/dom/matches");

QUnit.test("basics", function(){
	var a = document.createElement("a");
	a.id = "foo";
	document.getElementById('qunit-fixture').appendChild(a);

	QUnit.ok(matches.call(a, "#foo"), "matches selector");
});

QUnit.test("returns false for document", function(){
	var res = matches.call(document, "a");

	QUnit.equal(res, false, "document never matches");
});
