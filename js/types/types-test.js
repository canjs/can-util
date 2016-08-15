var QUnit = require('../../test/qunit');
var types = require('./types');
var DOCUMENT = require("../../dom/document/document");

QUnit.module("can-util/js/types");

QUnit.test('types.isConstructor', function () {
	var Constructor = function(){};
	Constructor.prototype.method = function(){};

	ok(types.isConstructor(Constructor));
	ok(!types.isConstructor(Constructor.prototype.method));

});

// Only run this in an environment with a document
if(DOCUMENT()) {

	QUnit.test("types.wrapElement", function() {
		var el = DOCUMENT().createElement("div");

		equal(el, types.wrapElement(el), "is an identity function by default");
	});

	QUnit.test("types.unwrapElement", function() {
		var el = DOCUMENT().createElement("div");

		equal(el, types.unwrapElement(el), "is an identity function by default");
	});

}
