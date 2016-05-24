var mutate = require('./mutate');
var MUTATION_OBSERVER = require("../mutation-observer/mutation-observer");

QUnit = require('steal-qunit');

QUnit.module("can-util/dom/mutate");

test("inserting empty frag", function () {
	var old = MUTATION_OBSERVER();
	MUTATION_OBSERVER(null);

	var frag = document.createDocumentFragment();
	mutate.appendChild.call( document.getElementById("qunit-fixture"), frag );

	var div = document.createElement("div");
	div.addEventListener("inserted", function(){
		ok(true, "called");
	});
	mutate.appendChild.call( document.getElementById("qunit-fixture"), div );
	stop();
	setTimeout(function(){
		MUTATION_OBSERVER(old);
		start();
	},10);

});
