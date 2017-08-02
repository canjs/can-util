'use strict';

var mutate = require('./mutate');
var MUTATION_OBSERVER = require("../mutation-observer/mutation-observer");
var DOCUMENT = require("../document/document");
var makeDocument = require("can-vdom/make-document/make-document");

var hasBubblingEvents = require('../../test/helpers').hasBubblingEvents;
var QUnit = require('../../test/qunit');
var unit = QUnit;

QUnit.module("can-util/dom/mutate");

function disableMO(){
	var old = MUTATION_OBSERVER();
	MUTATION_OBSERVER(null);
	return function(){
		MUTATION_OBSERVER(old);
	};
}

unit.test('inserting empty frag', function (assert) {
	var done = assert.async();
	var enableMO = disableMO();

	var frag = document.createDocumentFragment();
	mutate.appendChild.call( document.getElementById("qunit-fixture"), frag );

	var div = document.createElement("div");
	div.addEventListener("inserted", function(){
		assert.ok(true, "called");
	});
	mutate.appendChild.call( document.getElementById("qunit-fixture"), div );
	setTimeout(function(){
		enableMO();
		done();
	},10);
});

unit.test('removing the body causes removed events', function (assert) {
	var enableMO = disableMO();
	var oldDoc = DOCUMENT();

	var doc = makeDocument();
	DOCUMENT(doc);

	var div = doc.createElement("div");
	mutate.appendChild.call(doc.body, div);

	div.addEventListener("removed", function(){
		assert.ok(true, "called");
	});

	mutate.removeChild.call(doc.documentElement, doc.body);

	var done = assert.async();
	setTimeout(function(){
		enableMO();
		DOCUMENT(oldDoc);
		done();
	},10);

	/*
	var frag = document.createDocumentFragment();
	mutate.appendChild.call( document.getElementById("qunit-fixture"), frag );

	var div = document.createElement("div");
	div.addEventListener("inserted", function(){
		assert.ok(true, "called");
	});
	mutate.appendChild.call( document.getElementById("qunit-fixture"), div );
	var done = assert.async();
	setTimeout(function(){
		enableMO();
		start();
	},10);
	*/
});

if (hasBubblingEvents()) {
	unit.test('inserting into a different document fires inserted', function (assert) {
		var done = assert.async();
		var enableMO = disableMO();

		var doc = document.implementation.createHTMLDocument('Demo');
		var oldDoc = DOCUMENT();
		DOCUMENT(doc);

		var div = document.createElement("div");
		div.addEventListener("inserted", function(){
			assert.ok(true, "called");
			enableMO();
			DOCUMENT(oldDoc);
			done();
		});

		mutate.appendChild.call(doc.body, div);
	});
}
