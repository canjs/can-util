var domAttr = require('can-util/dom/attr/');
var domEvents = require('can-util/dom/events/');


QUnit = require('steal-qunit');

QUnit.module("can-util/dom/attr");

test("attributes event", function () {

	var div = document.createElement("div");

	var attrHandler1 = function(ev) {
		equal(ev.attributeName, "foo", "attribute name is correct");
		equal(ev.target, div, "target");
		equal(ev.oldValue, null, "oldValue");

		equal(div.getAttribute(ev.attributeName), "bar");
		domEvents.removeEventListener.call(div, "attributes", attrHandler1);
	};
	domEvents.addEventListener.call(div, "attributes", attrHandler1);

	domAttr.set(div, "foo", "bar");

	stop();

	setTimeout(function () {
		var attrHandler = function(ev) {
			ok(true, "removed event handler should be called");

			equal(ev.attributeName, "foo", "attribute name is correct");
			equal(ev.target, div, "target");
			equal(ev.oldValue, "bar", "oldValue should be 'bar'");

			equal(div.getAttribute(ev.attributeName), null, "value of the attribute should be null after the remove.");

			domEvents.removeEventListener.call(div, "attributes", attrHandler);
			start();
		};
		domEvents.addEventListener.call(div, "attributes", attrHandler);
		domAttr.remove(div, "foo");

	}, 50);

});

test("attr.set CHECKED attribute works", function(){

	var input = document.createElement("input");
	input.type = "checkbox";

	document.getElementById("qunit-fixture").appendChild(input);

	domAttr.set(input, "CHECKED");
	equal(input.checked, true);

	input.checked = false;

	domAttr.set(input, "CHECKED");

	equal(input.checked, true);
	document.getElementById("qunit-fixture").removeChild(input);
});


test("Map special attributes", function () {

	var div = document.createElement("label");

	document.getElementById("qunit-fixture").appendChild(div);

	domAttr.set(div, "for", "my-for");
	equal(div.htmlFor, "my-for", "Map for to htmlFor");

	domAttr.set(div, "innertext", "my-inner-text");
	equal(div.innerText, "my-inner-text", "Map innertext to innerText");

	domAttr.set(div, "textcontent", "my-content");
	equal(div.textContent, "my-content", "Map textcontent to textContent");

	domAttr.set(div, "readonly");
	equal(div.readOnly, true, "Map readonly to readOnly");

	document.getElementById("qunit-fixture").removeChild(div);
});

test('set class attribute via className or setAttribute for svg (#2015)', function() {
	var div = document.createElement('div');
	var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	var obj = { toString: function() { return 'my-class'; } };

	domAttr.set(div, 'class', 'my-class');
	equal(div.getAttribute('class'), 'my-class', 'class mapped to className');

	domAttr.set(div, 'class', undefined);
	equal(div.getAttribute('class'), '', 'an undefined className is an empty string');

	domAttr.set(div, 'class', obj);
	equal(div.getAttribute('class'), 'my-class', 'you can pass an object to className');

	domAttr.set(svg, 'class', 'my-class');
	equal(svg.getAttribute('class'), 'my-class', 'svg class was set as an attribute');

	domAttr.set(svg, 'class', undefined);
	equal(svg.getAttribute('class'), '', 'an undefined svg class is an empty string');

	domAttr.set(svg, 'class', obj);
	equal(svg.getAttribute('class'), 'my-class', 'you can pass an object to svg class');
});
