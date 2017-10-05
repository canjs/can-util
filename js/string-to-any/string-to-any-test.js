'use strict';

var QUnit = require("../../test/qunit");
var stringToAny = require("./string-to-any");
var each = require("../each/each");

QUnit.module("can-util/js/string-to-any");

QUnit.test("works with primitive types", function(assert){
	var fixture = {
		"foo": "foo",
		"33": 33,
		"true": true,
		"false": false,
		"undefined": undefined,
		"null": null,
		"Infinity": Infinity
	};

	each(fixture, function(value, key){
		assert.ok(stringToAny(key) === value, "Correctly converted type: " + key);
	});

	assert.ok(isNaN(stringToAny("NaN")), "Correclty converted type: NaN");
});
