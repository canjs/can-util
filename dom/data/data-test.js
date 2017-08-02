'use strict';

var domData = require("./data");
var domDataCore = require("./core");
var diff = require("../../js/diff-object/diff-object");
var assign = require("../../js/assign/assign");
var getDocument = require("../document/document");
var mutate = require("../mutate/mutate");
var unit = require('../../test/qunit');

var document = getDocument();

unit.module('can-util/dom/data');

unit.test('domData should be cleaned up if element is removed from DOM', function (assert) {
	var done = assert.async();
	var fixture = document.getElementById('qunit-fixture');
	var origData = assign({}, domDataCore._data);

	var div = document.createElement('div');
	mutate.appendChild.call(fixture, div);
	domData.set.call(div, "div-data", { abc: "def" });
	var newData = assign({}, domDataCore._data);
	assert.ok(diff(origData, newData).length > 0, "items added to domData._data for div");

	mutate.removeChild.call(fixture, div);

	var maxTime = Date.now() + 1.5 * 60 * 1000;
	var checkResetChanges = function(){
		var newData = assign({}, domDataCore._data);
		if(diff(origData, newData).length === 0) {
			assert.ok(true, "domData._data returned to initial state");
			done();
		} else {
			if (Date.now() > maxTime) {
				assert.ok(false, "domData._data not returned to initial state");
				done();
			}
			else {
				setTimeout(checkResetChanges, 10);
			}
		}
	};
	checkResetChanges();
});

unit.test('domData should be cleaned up if multiple elements are removed from DOM', function (assert) {
	var done = assert.async();
	var fixture = document.getElementById('qunit-fixture');
	var origData = assign({}, domDataCore._data);

	var div = document.createElement('div');
	mutate.appendChild.call(fixture, div);
	domData.set.call(div, "div-data", { abc: "def" });
	var newData = assign({}, domDataCore._data);
	assert.ok(diff(origData, newData).length > 0, "items added to domData._data for div");

	var p = document.createElement('p');
	mutate.appendChild.call(fixture, p);
	domData.set.call(p, "p-data", { ghi: "jkl" });
	newData = assign({}, domDataCore._data);
	assert.ok(diff(origData, newData).length > 0, "items added to domData._data for p");

	mutate.removeChild.call(fixture, div);
	mutate.removeChild.call(fixture, p);

	setTimeout(function() {
		assert.deepEqual(domDataCore._data, origData, "domData._data returned to initial state");
		done();
	}, 10);
});

unit.test('domData should be cleaned up if element is removed from DOM after calling setData for two different keys', function (assert) {
	var fixture = document.getElementById('qunit-fixture');
	var done = assert.async();
	var origData = assign({}, domDataCore._data);

	var div = document.createElement('div');
	mutate.appendChild.call(fixture, div);
	domData.set.call(div, "div-data", { abc: "def" });
	domData.set.call(div, "div-other-data", { ghi: "jkl" });
	var newData = assign({}, domDataCore._data);
	assert.ok(diff(origData, newData).length > 0, "items added to domData._data for div");

	mutate.removeChild.call(fixture, div);

	setTimeout(function() {
		assert.deepEqual(domDataCore._data, origData, "domData._data returned to initial state");
		done();
	}, 10);
});

unit.test('domData should be cleaned up if element is removed from DOM after calling setData twice for the same key', function (assert) {
	var fixture = document.getElementById('qunit-fixture');
	var done = assert.async();
	var origData = assign({}, domDataCore._data);

	var div = document.createElement('div');
	mutate.appendChild.call(fixture, div);
	domData.set.call(div, "div-data", { abc: "def" });
	domData.set.call(div, "div-data", { ghi: "jkl" });
	var newData = assign({}, domDataCore._data);
	assert.ok(diff(origData, newData).length > 0, "items added to domData._data for div");

	mutate.removeChild.call(fixture, div);

	setTimeout(function() {
		assert.deepEqual(domDataCore._data, origData, "domData._data returned to initial state");
		done();
	}, 10);
});
