import QUnit from "../../test/qunit.js";
import stringToAny from "./string-to-any.js";
import each from "../each/each.js";

QUnit.module("can-util/js/string-to-any");

QUnit.test("works with primitive types", function () {
	var fixture = {
		"foo": "foo",
		"33": 33,
		"true": true,
		"false": false,
		"undefined": undefined,
		"null": null,
		"Infinity": Infinity
	};

	each(fixture, function (value, key) {
		QUnit.ok(stringToAny(key) === value, "Correctly converted type: " + key);
	});

	QUnit.ok(isNaN(stringToAny("NaN")), "Correclty converted type: NaN");
});