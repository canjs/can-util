var mutate = require('./mutate');
var MUTATION_OBSERVER = require("../mutation-observer/mutation-observer");
var DOCUMENT = require("../document/document");

var domDispatch = require('can-util/dom/dispatch/');
var buildFrag = require('can-util/dom/fragment/');
var eventsBubble = (function() {
	var frag = buildFrag("<div><span></span></div>");
	var bubbles = false;

	frag.firstChild.addEventListener('click', function() {
		bubbles = true;
	});
	
	domDispatch.call(frag.firstChild.firstChild, 'click');

	return bubbles;
})();

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

if(eventsBubble) {
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
