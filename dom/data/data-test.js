'use strict';

var domData = require("./data");
var domDataState = require("can-dom-data-state");
var diff = require("../../js/diff-object/diff-object");
var getDocument = require('can-globals/document/document');
var mutate = require("../mutate/mutate");
var mutationDocument = require("../mutation-observer/document/document");
var unit = require('../../test/qunit');

var document = getDocument();

unit.module('can-util/dom/data');

unit.test('domData should be cleaned up if element is removed from DOM', function (assert) {
	var done = assert.async();
	var fixture = document.getElementById('qunit-fixture');
	var origDataKeys = Object.keys(domDataState._data);

	var div = document.createElement('div');
	mutate.appendChild.call(fixture, div);
	domData.set.call(div, "div-data", { abc: "def" });
	var newDataKeys = Object.keys(domDataState._data);
	assert.ok(diff(origDataKeys, newDataKeys).length > 0, "items added to domData._data for div");

	mutate.removeChild.call(fixture, div);

	var checkRemoved = function() {
		if (diff(Object.keys(domDataState._data), origDataKeys).length === 0) {
			assert.ok(true, "domData._data returned to initial state");
			done();
		}
		else {
			setTimeout(checkRemoved, 10);
		}
	};

	checkRemoved();
});

unit.test('domData should be cleaned up if multiple elements are removed from DOM', function (assert) {
	var done = assert.async();
	var fixture = document.getElementById('qunit-fixture');
	var origDataKeys = Object.keys(domDataState._data);

	var div = document.createElement('div');
	mutate.appendChild.call(fixture, div);
	domData.set.call(div, "div-data", { abc: "def" });
	var newDataKeys = Object.keys(domDataState._data);
	assert.ok(diff(origDataKeys, newDataKeys).length > 0, "items added to domData._data for div");

	var p = document.createElement('p');
	mutate.appendChild.call(fixture, p);
	domData.set.call(p, "p-data", { ghi: "jkl" });
	newDataKeys = Object.keys(domDataState._data);
	assert.ok(diff(origDataKeys, newDataKeys).length > 1, "items added to domData._data for p");

	mutate.removeChild.call(fixture, div);
	mutate.removeChild.call(fixture, p);

	var checkRemoved = function() {
		if (diff(Object.keys(domDataState._data), origDataKeys).length === 0) {
			assert.ok(true, "domData._data returned to initial state");
			done();
		}
		else {
			setTimeout(checkRemoved, 10);
		}
	};

	checkRemoved();
});

unit.test('domData should be cleaned up if element is removed from DOM after calling setData for two different keys', function (assert) {
	var fixture = document.getElementById('qunit-fixture');
	var done = assert.async();
	var origDataKeys = Object.keys(domDataState._data);

	var div = document.createElement('div');
	mutate.appendChild.call(fixture, div);
	domData.set.call(div, "div-data", { abc: "def" });
	domData.set.call(div, "div-other-data", { ghi: "jkl" });
	var newDataKeys = Object.keys(domDataState._data);
	assert.ok(diff(origDataKeys, newDataKeys).length > 0, "items added to domData._data for div");

	mutate.removeChild.call(fixture, div);

	var checkRemoved = function() {
		if (diff(Object.keys(domDataState._data), origDataKeys).length === 0) {
			assert.ok(true, "domData._data returned to initial state");
			done();
		}
		else {
			setTimeout(checkRemoved, 10);
		}
	};

	checkRemoved();
});

unit.test('domData should be cleaned up if element is removed from DOM after calling setData twice for the same key', function (assert) {
	var fixture = document.getElementById('qunit-fixture');
	var done = assert.async();
	var origDataKeys = Object.keys(domDataState._data);

	var div = document.createElement('div');
	mutate.appendChild.call(fixture, div);
	domData.set.call(div, "div-data", { abc: "def" });
	domData.set.call(div, "div-data", { ghi: "jkl" });
	var newDataKeys = Object.keys(domDataState._data);
	assert.ok(diff(origDataKeys, newDataKeys).length > 0, "items added to domData._data for div");

	mutate.removeChild.call(fixture, div);

	var checkRemoved = function() {
		if (diff(Object.keys(domDataState._data), origDataKeys).length === 0) {
			assert.ok(true, "domData._data returned to initial state");
			done();
		}
		else {
			setTimeout(checkRemoved, 10);
		}
	};

	checkRemoved();
});

// MutationObserver is needed for these tests
if(typeof MutationObserver !== 'undefined'){
	unit.test('domData should count active elements', function (assert){
		var done = assert.async();
		var div = document.createElement('div');
		var fixture = document.getElementById('qunit-fixture');
		var startingCount = domData._getElementSetCount();
	
		mutate.appendChild.call(fixture, div);
		domData.set.call(div, 'foo', 'bar');
		domData.set.call(div, 'foo', 'baz');
	
		assert.equal(domData.get.call(div, 'foo'), 'baz', 'foo was set');
		assert.equal(domData._getElementSetCount(), startingCount + 1, '_getElementSetCount() incremented');
		
		mutate.removeChild.call(fixture, div);

		mutationDocument.onAfterRemovedNodes(function handler(){
			mutationDocument.offAfterRemovedNodes(handler);
			// It is possible for this event to fire before the element is deleted from domDataState
			setTimeout(function(){
				assert.equal(domData._getElementSetCount(), startingCount, '_getElementSetCount() decremented');
				assert.equal(domData.get.call(div, 'foo'), undefined, 'foo was deleted');
				done();
			}, 0);
		});
		
	});

	unit.test('domData should not decrement when removing a deleted element', function (assert){
		var done = assert.async();
		var div = document.createElement('div');
		var fixture = document.getElementById('qunit-fixture');
		var startingCount = domData._getElementSetCount();

		mutate.appendChild.call(fixture, div);
		domData.set.call(div, 'foo', 'bar');
		domData.delete.call(div);
		mutate.removeChild.call(fixture, div);

		mutationDocument.onAfterRemovedNodes(function handler(){
			assert.equal(domData._getElementSetCount(), startingCount);
			mutationDocument.offAfterRemovedNodes(handler);
			done();
		});
	});
}
