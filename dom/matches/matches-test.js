'use strict';

var matches = require("./matches");

var unit = require('../../test/qunit');
var isServer = require('../../test/helpers').isServer;

unit.module("can-util/dom/matches");

var supportsMatchesMethod = !isServer();
if (supportsMatchesMethod) {
	unit.test("basics", function (assert) {
		var a = document.createElement("a");
		a.id = "foo";
		document.getElementById('qunit-fixture').appendChild(a);

		assert.ok(matches.call(a, "#foo"), "matches selector");
	});
}

unit.test("returns false for document", function (assert) {
	var res = matches.call(document, "a");
	assert.equal(res, false, "document never matches");
});
