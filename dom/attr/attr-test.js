'use strict';

var domAttr = require('../attr/attr');
var domEvents = require('../events/events');
var domData = require("../data/data");
var domDispatch = require("../dispatch/dispatch");
var mutate = require("../mutate/mutate");
var MUTATION_OBSERVER = require('can-util/dom/mutation-observer/mutation-observer');
var types = require("can-types");


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

test("attr events without MUTATION_OBSERVER", 9, function(){
	var MO = MUTATION_OBSERVER();
	MUTATION_OBSERVER(null);

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
			MUTATION_OBSERVER(MO);
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

	if('innerText' in div) {
		domAttr.set(div, "innertext", "my-inner-text");
		equal(div.innerText, "my-inner-text", "Map innertext to innerText");
	}

	domAttr.set(div, "textcontent", "my-content");
	equal(div.textContent, "my-content", "Map textcontent to textContent");

	document.getElementById("qunit-fixture").removeChild(div);
	div = document.createElement("input");
	div.type = "text";
	document.getElementById("qunit-fixture").appendChild(div);

	domAttr.set(div, "readonly");
	equal(div.readOnly, true, "Map readonly to readOnly");

	domAttr.set(div, "readonly", false);
	equal(div.readOnly, false, "not readonly");
	domAttr.set(div, "readonly", "");
	equal(div.readOnly, true, "readonly again");

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

test("set xlink:href attribute via setAttributeNS for svg-use (#2384)", function() {
	var use = document.createElementNS("http://www.w3.org/2000/svg", "use");

	domAttr.set(use, "xlink:href", "svgUri");
	equal(use.getAttributeNS("http://www.w3.org/1999/xlink", "href"), "svgUri", "svg-use xlink:href was set with setAttributeNS");
});

test("attr.special addEventListener allows custom binding", function(){
	var trigger;
	domAttr.special.foo = {
		addEventListener: function(eventName, handler){
			trigger = function(){
				handler();
			};

			return function(){
				trigger = function(){};
			};
		},
		set: function(val){
			this.foo = val;
			// Trigger an event
			trigger();
		}
	};

	var div = document.createElement("div");

	var times = 0;
	var handler = function(){
		times++;
		equal(times, 1, "addEventListener called");
	};
	domEvents.addEventListener.call(div, "foo", handler);

	domAttr.set(div, "foo", "bar");

	domEvents.removeEventListener.call(div, "foo", handler);

	// Shouldn't happen again.
	domAttr.set(div, "foo", "baz");
	delete domAttr.special.foo;
});

test("'selected' is bindable on an <option>", function(){
	var select = document.createElement("select");
	var option1 = document.createElement("option");
	option1.value = "one";
	var option2 = document.createElement("option");
	option2.value = "two";
	select.appendChild(option1);
	select.appendChild(option2);

	domEvents.addEventListener.call(option2, "selected", function(){
		ok(true, "selected was called on the option");
	});

	option2.selected = true;
	domDispatch.call(select, "change");

	equal(domAttr.get(option1, "selected"), false, "option1 is not selected");
	equal(domAttr.get(option2, "selected"), true, "option2 is selected");
});

test("get, set, and addEventListener on values", function(){
	var select = document.createElement("select");
	select.multiple = true;
	var option1 = document.createElement("option");
	option1.value = "one";
	var option2 = document.createElement("option");
	option2.value = "two";

	select.appendChild(option1);
	select.appendChild(option2);

	var valuesCount = 0;
	domEvents.addEventListener.call(select, "values", function(){
		valuesCount++;
	});

	deepEqual(domAttr.get(select, "values"), [], "None selected to start");

	option1.selected = true;
	domDispatch.call(select, "change");

	equal(valuesCount, 1, "values event");
	deepEqual(domAttr.get(select, "values"), ["one"], "First option is in values");

	option2.selected = true;
	domDispatch.call(select, "change");

	equal(valuesCount, 2, "values event");
	deepEqual(domAttr.get(select, "values"), ["one", "two"], "both selected");

	option1.selected = option2.selected = false;
	domDispatch.call(select, "change");

	equal(valuesCount, 3, "values event");
	deepEqual(domAttr.get(select, "values"), [], "none selected");

	domAttr.set(select, "values", ["two"]);

	equal(option1.selected, false, "option1 not selected");
	equal(option2.selected, true, "option2 selected");
	deepEqual(domAttr.get(select, "values"), ["two"], "two is only selected");

});

test("get, set, and addEventListener on innerHTML", function(){
	var div = document.createElement("div");
	div.appendChild(document.createElement("span"));

	var count = 0;
	domEvents.addEventListener.call(div, "innerHTML", function(){
		count++;
	});

	equal(domAttr.get(div, "innerHTML"), "<span></span>", "got innerhtml");

	domAttr.set(div, "innerHTML", "<p>hello</p>");
	domDispatch.call(div, "change");
	equal(count, 1, "innerHTML event");

	equal(domAttr.get(div, "innerHTML"), "<p>hello</p>", "got innerhtml");
});

test("get, set on 'value'", function(){
	var input = document.createElement("input");
	input.value = "foo";

	equal(domAttr.get(input, "value"), "foo", "got the value");

	domAttr.set(input, "value", "bar");
	equal(domAttr.get(input, "value"), "bar", "got the value");

	input.value = "";
	equal(domAttr.get(input, "value"), "", "value is an empty string");
});

test("get/sets the checkedness of a checkbox", function(){
	var input = document.createElement("input");
	input.type = "checkbox";

	equal(domAttr.get(input, "checked"), false, "not checked");

	domAttr.set(input, "checked", true);
	equal(domAttr.get(input, "checked"), true, "now it is true");

	domAttr.set(input, "checked", false);
	equal(domAttr.get(input, "checked"), false, "now it is false");

	domAttr.set(input, "checked");
	equal(domAttr.get(input, "checked"), true, "now it is true");

	domAttr.set(input, "checked", 0);
	equal(domAttr.get(input, "checked"), false, "now it is false");

	domAttr.set(input, "checked", "");
	equal(domAttr.get(input, "checked"), true, "now it is true");
});

test("For inputs checked is set as an attribute", function(){
	var input = document.createElement("input");
	input.type = "checkbox";

	domAttr.set(input, "checked", "");
	equal(input.checked, true, "checked is true");
	equal(input.getAttribute("checked"), undefined, "no checked attr");

	var customEl = document.createElement("custom-element");

	domAttr.set(customEl, "checked", "");
	ok(customEl.hasAttribute("checked"), "has checked attr");
	equal(customEl.getAttribute("checked"), "", "attr is an empty string");
	equal(domAttr.get(customEl, "checked"), "", "attr from get");
});

test("attr.special.value, fallback to the attribute", function(){
	var customEl = document.createElement("custom-element");
	customEl.setAttribute("value", "foo");

	equal(domAttr.get(customEl, "value"), "foo", "value is foo");
});

test("Setting a select's value updates child's selectedness", function(){
	var select = document.createElement("select");
	var option1 = document.createElement("option");
	option1.value = "one";
	option1.selected = true;
	var option2 = document.createElement("option");
	option2.value = "two";

	select.appendChild(option1);
	select.appendChild(option2);

	equal(domAttr.get(select, "value"), "one", "initial value");

	domAttr.set(select, "value", "two");
	equal(option1.selected, false, "not selected");
	equal(option2.selected, true, "now it is selected");
});

test("Removing an option causes the select's value to be re-evaluated", function(){

		var select = document.createElement("select");
		var option1 = document.createElement("option");
		option1.value = "one";

		var option2 = document.createElement("option");
		option2.value = "two";

		select.appendChild(option1);
		select.appendChild(option2);

		domAttr.set(select, "value", "one");
		equal(option1.selected, true, "selected");
		equal(domAttr.get(select, "value"), "one", "got the value");

		domEvents.addEventListener.call(select, "change", function(){
			equal(domAttr.get(select, "value"), undefined, "no value now");
			start();
		});

		stop();

		select.removeChild(option1);
		if(!MUTATION_OBSERVER()) {
			var data = domData.get.call(select, "canBindingCallback");
			data.onMutation();
		}
	});

test("Multiselect values is updated on any children added/removed", function(){
	var select = document.createElement("select");
	select.multiple = true;

	var option1 = document.createElement("option");
	option1.value = "one";

	var option2 = document.createElement("option");
	option2.value = "two";

	var option3 = document.createElement("option");
	option3.value = "three";
	option3.selected = true;

	select.appendChild(option1);
	select.appendChild(option2);
	select.appendChild(option3);

	domAttr.set(select, "values", ["one", "three"]);
	deepEqual(domAttr.get(select, "values"), ["one", "three"], "initial value is right");

	domEvents.addEventListener.call(select, "values", function(){
		deepEqual(domAttr.get(select, "values"), ["three"], "new val is right");

		start();
	});

	stop();

	select.removeChild(option1);
	if(!MUTATION_OBSERVER()) {
		var data = domData.get.call(select, "canBindingCallback");
		data.onMutation();
	}
});

test("Select options within optgroups should be set via `value` properly", function() {
	function tag (tag, value) {
		var el = document.createElement(tag);
		if (value) {
			el.value = value;
		}
		return el;
	}

	var select = tag('select');
	var optgroup1 = tag('optgroup');
	var option11 = tag('option', 'list1-item1');
	option11.selected = true; // initial selection
	var option12 = tag('option', 'list1-item2');
	var optgroup2 = tag('optgroup');
	var option21 = tag('option', 'list2-item1');
	var option22 = tag('option', 'list2-item2');

	select.appendChild(optgroup1);
	select.appendChild(optgroup2);
	optgroup1.appendChild(option11);
	optgroup1.appendChild(option12);
	optgroup2.appendChild(option21);
	optgroup2.appendChild(option22);

	equal(domAttr.get(select, 'value'), 'list1-item1', 'initial value');

	domAttr.set(select, 'value', 'list2-item2');
	equal(domAttr.get(select, 'value'), 'list2-item2', 'updated value');
	equal(option11.selected, false, 'initial option is not selected');
	equal(option22.selected, true, 'second option is selected');
});

test("Select options within optgroups should be set via `values` properly", function() {
	function tag (tag, value) {
		var el = document.createElement(tag);
		if (value) {
			el.value = value;
		}
		return el;
	}

	var select = tag('select');
	select.multiple = true;
	var optgroup1 = tag('optgroup');
	var option11 = tag('option', 'list1-item1');
	option11.selected = true; // initial selection
	var option12 = tag('option', 'list1-item2');
	var optgroup2 = tag('optgroup');
	var option21 = tag('option', 'list2-item1');
	var option22 = tag('option', 'list2-item2');

	select.appendChild(optgroup1);
	select.appendChild(optgroup2);
	optgroup1.appendChild(option11);
	optgroup1.appendChild(option12);
	optgroup2.appendChild(option21);
	optgroup2.appendChild(option22);

	deepEqual(domAttr.get(select, 'values'), ['list1-item1'], 'initial value');

	domAttr.set(select, 'values', ['list1-item2', 'list2-item2']);
	deepEqual(domAttr.get(select, 'values'), ['list1-item2', 'list2-item2'], 'updated value');
	equal(option11.selected, false, 'initial option is not selected');
	equal(option12.selected, true, 'second option is selected');
	equal(option22.selected, true, 'third option is selected');
});

test("Setting a value that will be appended later", function(){
	var select = document.createElement("select");
	var option1 = document.createElement("option");
	option1.value = "one";

	domAttr.set(select, "value", "two");

	var option2 = document.createElement("option");
	option2.value = "two";

	domEvents.addEventListener.call(select, "change", function(){
		equal(domAttr.get(select, "value"), "two", "option2 is selected");
		start();
	});

	stop();

	select.appendChild(option2);
	if(!MUTATION_OBSERVER()) {
		var data = domData.get.call(select, "canBindingCallback");
		data.onMutation();
	}

});

test("Calling remove on checked sets it to false", function(){
	var input = document.createElement("input");
	input.type = "checkbox";

	domAttr.set(input, "checked");
	equal(input.checked, true, "it is checked");

	domAttr.remove(input, "checked");
	equal(input.checked, false, "not checked");
});

test("Boolean attrs that don't support a prop sets the attribute", function(){
	var div = document.createElement("div");
	domAttr.set(div, "disabled");

	equal(domAttr.get(div, "disabled"), "", "empty string");
});

test("Setting a non-string value on a select correctly selects the child", function(){
	var select = document.createElement("select");
	var option1 = document.createElement("option");
	option1.value = "1";
	var option2 = document.createElement("option");
	option2.value = "2";

	select.appendChild(option1);
	select.appendChild(option2);

	domAttr.set(select, "value", 2);
	equal(option2.selected, true, "second one is selected");
});

test("Setting null doesn't select the default value on a select", function(){
	var select = document.createElement("select");
	var option1 = document.createElement("option");
	option1.value = '';
	var option2 = document.createElement("option");
	option2.value = "two";

	select.appendChild(option1);
	select.appendChild(option2);

	// This is really stupid
	domAttr.set(select, "value", null);
	equal(option1.selected, false, "option1 not selected");
	equal(option2.selected, false, "option2 not selected");
	equal(select.selectedIndex, -1, "no selected index, wha-wha");
});

test("setting .value on an input to undefined or null makes value empty (#83)", function(){
	var input = document.createElement("input");
	input.value = "something";
	domAttr.set(input, "value", null);
	QUnit.equal(input.value, "", "null");
	domAttr.set(input, "value", undefined);
	QUnit.equal(input.value, "", "undefined");
});

test("attr.special.focused calls after previous events", function(){
	var oldQueue = types.queueTask;
	types.queueTask = function(task){
		setTimeout(function(){
			task[0].apply(task[1], task[2]);
		}, 5);
	};

	var input = document.createElement("input");
	input.type = "text";
	var ta = document.getElementById("qunit-fixture");
	ta.appendChild(input);

	stop();

	domAttr.set(input, "focused", true);
	setTimeout(function(){
		equal(domAttr.get(input, "focused"), true, "it is now focused");
		types.queueTask = oldQueue;
		start();
	}, 10);

	equal(domAttr.get(input, "focused"), false, "not focused yet");
});

test("attr.special.focused binds on inserted if element is detached", 2, function(){
	var input = document.createElement("input");
	input.type = "text";
	var ta = document.getElementById("qunit-fixture");

	stop();
	domAttr.set(input, "focused", true);
	equal(domAttr.get(input, "focused"), false, "not focused yet");
	domEvents.addEventListener.call(input, "inserted", function() {
		equal(domAttr.get(input, "focused"), true, "it is now focused");
		start();		
	});
	mutate.appendChild.call(ta, input);

});

test("handles removing multiple event handlers", function () {
	var handler1 = function() {};
	var handler2 = function() {};

	var div = document.createElement('div');

	domEvents.addEventListener.call(div, "attributes", handler1, false);
	domEvents.addEventListener.call(div, "attributes", handler2, false);

	domEvents.removeEventListener.call(div, "attributes", handler1);
	domEvents.removeEventListener.call(div, "attributes", handler2);

	ok(true, 'should not throw');
});

test("handles removing multiple event handlers without MUTATION_OBSERVER", function () {
	var MO = MUTATION_OBSERVER();
	MUTATION_OBSERVER(null);
	var handler1 = function() {};
	var handler2 = function() {};

	var div = document.createElement('div');

	domEvents.addEventListener.call(div, "attributes", handler1, false);
	domEvents.addEventListener.call(div, "attributes", handler2, false);

	domEvents.removeEventListener.call(div, "attributes", handler1);
	domEvents.removeEventListener.call(div, "attributes", handler2);

	ok(true, 'should not throw');
	MUTATION_OBSERVER(MO);
});

if(window.eventsBubble) {
	test('get, set, and addEventListener on focused', function(){
		var input = document.createElement("input");
		var ta = document.getElementById("qunit-fixture");
		var test;
		var focusedCount = 0;


		ta.appendChild(input);

		var tests = [
			{
				action: function(){
					equal( domAttr.get(input, "focused"), false, "get not focused" );

					domAttr.set(input, "focused", true);
					if(!document.hasFocus()) {
						domDispatch.call(input, "focus");
					}
				},
				test: function(){
					equal(focusedCount, 1, "focused event");
					equal( domAttr.get(input,"focused"), true, "get focused" );
				}
			},
			{
				action: function(){
					domAttr.set(input, "focused", false);
					if(!document.hasFocus()) {
						domDispatch.call(input, "blur");
					}
				},
				test: function(){
					equal(focusedCount, 2, "focused event");
					equal( domAttr.get(input,"focused"), false, "get not focused after blur" );
				}
			}
		];

		function next(){
			test = tests.shift();
			if(!test) {
				start();
				return;
			}

			// Calling the action will trigger an event below, that event will then
			// call test.test() to make sure it works. This is b/c IE10 fires focus
			// asynchronously.
			test.action();
		}

		// fired on blur and focus events
		ok(domAttr.special.focused.addEventListener, "addEventListener implemented");
		domEvents.addEventListener.call(input, "focused", function(){
			focusedCount++;

			test.test();
			setTimeout(next, 50);
		});

		stop();
		next();
	});
}

test("Binding to selected updates the selectedness of options", function(){
	expect(3);
	var select = document.createElement("select");
	var option1 = document.createElement("option");
	option1.selected = false;
	option1.value = "one";
	select.appendChild(option1);

	var option2 = document.createElement("option");
	option2.value = "two";
	select.appendChild(option2);

	domEvents.addEventListener.call(option1, "selected", function(){
		ok(true, "this was called");
	});

	domAttr.set(option1, "selected", true);

	option2.selected = true;
	domDispatch.call(select, "change");

	equal(option2.selected, true);
	equal(option1.selected, false);
});

test("Select's value is preserved when inserted into the document", function(){
	stop();
	var select = document.createElement("select");
	var option1 = document.createElement("option");
	option1.value = "one";
	select.appendChild(option1);

	domAttr.set(select, "value", null);

	equal(select.selectedIndex, -1, "was set to -1");

	var ta = document.getElementById("qunit-fixture");
	mutate.appendChild.call(ta, select);

	setTimeout(function(){
		equal(select.selectedIndex, -1, "still is -1");
		start();
	}, 50);

});

test('multi-select does not dispatch a values change event if its selected options are unchanged (#105)', function() {
	var div = document.createElement('div');
	div.innerHTML = '<select multiple><option selected>2</option><option selected>1</option><option>3</option></select>';

	var select = div.firstChild;
	document.body.appendChild(div);
	// the multi-select is in the DOM with values of ['2', '1']

	var valuesChanges = 0;
	domEvents.addEventListener.call(select, 'values', function(){
		valuesChanges++;
	});

	domAttr.set(select, 'values', ['1', '2']);
	select.innerHTML = '<option selected>1</option><option selected>2</option><option>3</option>';
	// we manipulate the multi-select, but don't change its selected options ['1', '2"]

	QUnit.stop();

	setTimeout(function() {
		QUnit.strictEqual(valuesChanges, 0, 'we do not dispatch a change event');
		document.body.removeChild(div);
		QUnit.start();
	}, 50);
});

test('setting checked to undefined should result in false for checkboxes (#184)', function(){
	var input = document.createElement('input');
	input.type = 'checkbox';

	domAttr.set(input, 'checked', undefined);
	QUnit.equal(input.checked, false, 'Should set checked to false');

	domAttr.set(input, 'checked', true);
	QUnit.equal(input.checked, true, 'Should become true');
	domAttr.set(input, 'checked', undefined);
	QUnit.equal(input.checked, false, 'Should become false again');
});
