'use strict';

var domData = require("./data");
var domDataCore = require("./core");
var diff = require("../../js/diff-object/diff-object");
var assign = require("../../js/assign/assign");
var getDocument = require("../document/document");
var mutate = require("../mutate/mutate");
var QUnit = require("steal-qunit");

var document = getDocument();

QUnit.module("can-util/dom/data", {
	beforeEach: function() {
		this.fixture = document.getElementById("qunit-fixture");
	},
	afterEach: function() {
		this.fixture = null;
	}
});

test("domData should be cleaned up if element is removed from DOM", function(assert) {
	var done = assert.async();
	var origData = assign({}, domDataCore._data);

	var div = document.createElement('div');
	mutate.appendChild.call(this.fixture, div);
	domData.set.call(div, "div-data", { abc: "def" });
	var newData = assign({}, domDataCore._data);
	QUnit.ok(diff(origData, newData).length > 0, "items added to domData._data for div");

	mutate.removeChild.call(this.fixture, div);

	setTimeout(function() {
		QUnit.deepEqual(domDataCore._data, origData, "domData._data returned to initial state");
		done();
	}, 10);
});

test("domData should be cleaned up if multiple elements are removed from DOM", function(assert) {
	var done = assert.async();
	var origData = assign({}, domDataCore._data);

	var div = document.createElement('div');
	mutate.appendChild.call(this.fixture, div);
	domData.set.call(div, "div-data", { abc: "def" });
	var newData = assign({}, domDataCore._data);
	QUnit.ok(diff(origData, newData).length > 0, "items added to domData._data for div");

	var p = document.createElement('p');
	mutate.appendChild.call(this.fixture, p);
	domData.set.call(p, "p-data", { ghi: "jkl" });
	newData = assign({}, domDataCore._data);
	QUnit.ok(diff(origData, newData).length > 0, "items added to domData._data for p");

	mutate.removeChild.call(this.fixture, div);
	mutate.removeChild.call(this.fixture, p);

	setTimeout(function() {
		QUnit.deepEqual(domDataCore._data, origData, "domData._data returned to initial state");
		done();
	}, 10);
});

test("domData should be cleaned up if element is removed from DOM after calling setData for two different keys", function(assert) {
	var done = assert.async();
	var origData = assign({}, domDataCore._data);

	var div = document.createElement('div');
	mutate.appendChild.call(this.fixture, div);
	domData.set.call(div, "div-data", { abc: "def" });
	domData.set.call(div, "div-other-data", { ghi: "jkl" });
	var newData = assign({}, domDataCore._data);
	QUnit.ok(diff(origData, newData).length > 0, "items added to domData._data for div");

	mutate.removeChild.call(this.fixture, div);

	setTimeout(function() {
		QUnit.deepEqual(domDataCore._data, origData, "domData._data returned to initial state");
		done();
	}, 10);
});

test("domData should be cleaned up if element is removed from DOM after calling setData twice for the same key", function(assert) {
	var done = assert.async();
	var origData = assign({}, domDataCore._data);

	var div = document.createElement('div');
	mutate.appendChild.call(this.fixture, div);
	domData.set.call(div, "div-data", { abc: "def" });
	domData.set.call(div, "div-data", { ghi: "jkl" });
	var newData = assign({}, domDataCore._data);
	QUnit.ok(diff(origData, newData).length > 0, "items added to domData._data for div");

	mutate.removeChild.call(this.fixture, div);

	setTimeout(function() {
		QUnit.deepEqual(domDataCore._data, origData, "domData._data returned to initial state");
		done();
	}, 10);
});
