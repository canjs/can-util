'use strict';

var mutate = require('./mutate');
var MUTATION_OBSERVER = require("../mutation-observer/mutation-observer");
var DOCUMENT = require("../document/document");
var makeDocument = require("can-vdom/make-document/make-document");

QUnit = require('steal-qunit');

QUnit.module("can-util/dom/mutate");

function disableMO(){
	var old = MUTATION_OBSERVER();
	MUTATION_OBSERVER(null);
	return function(){
		MUTATION_OBSERVER(old);
	};
}

test("inserting empty frag", function () {
	var enableMO = disableMO();

	var frag = document.createDocumentFragment();
	mutate.appendChild.call( document.getElementById("qunit-fixture"), frag );

	var div = document.createElement("div");
	div.addEventListener("inserted", function(){
		ok(true, "called");
	});
	mutate.appendChild.call( document.getElementById("qunit-fixture"), div );
	stop();
	setTimeout(function(){
		enableMO();
		start();
	},10);
});

test("removing the body causes removed events", function () {
	var enableMO = disableMO();
	var oldDoc = DOCUMENT();

	var doc = makeDocument();
	DOCUMENT(doc);

	var div = doc.createElement("div");
	mutate.appendChild.call(doc.body, div);

	div.addEventListener("removed", function(){
		ok(true, "called");
	});

	mutate.removeChild.call(doc.documentElement, doc.body);

	stop();
	setTimeout(function(){
		enableMO();
		DOCUMENT(oldDoc);
		start();
	},10);

	/*
	var frag = document.createDocumentFragment();
	mutate.appendChild.call( document.getElementById("qunit-fixture"), frag );

	var div = document.createElement("div");
	div.addEventListener("inserted", function(){
		ok(true, "called");
	});
	mutate.appendChild.call( document.getElementById("qunit-fixture"), div );
	stop();
	setTimeout(function(){
		enableMO();
		start();
	},10);
	*/
});

if(window.eventsBubble) {
	test("inserting into a different document fires inserted", function(){
		var enableMO = disableMO();

		var doc = document.implementation.createHTMLDocument('Demo');
		var oldDoc = DOCUMENT();
		DOCUMENT(doc);

		var div = document.createElement("div");
		div.addEventListener("inserted", function(){
			ok(true, "called");
		});
		mutate.appendChild.call(doc.body, div);

		stop();
		setTimeout(function(){
			enableMO();
			DOCUMENT(oldDoc);
			start();
		}, 10);
	});
}
