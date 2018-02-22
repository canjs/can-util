'use strict';

var domAttr = require('../attr/attr');
var domEvents = require('../events/events');
var domData = require("../data/data");
var domDispatch = require("../dispatch/dispatch");
var mutate = require("../mutate/mutate");
var getMutationObserver = require('can-globals/mutation-observer/mutation-observer');
var types = require("can-types");

var helpers = require('../../test/helpers');
var isServer = helpers.isServer;
var unit = require('../../test/qunit');

//use this to skip tests that should not be run on the server
unit.skipOnServer = unit.test;
if (isServer) {
	unit.skipOnServer = unit.skip;
}


unit.module("can-util/dom/attr");

unit.test("attributes event", function (assert) {
	var done = assert.async();
	var div = document.createElement("div");

	var attrHandler1 = function(ev) {
		assert.equal(ev.attributeName, "foo", "attribute name is correct");
		assert.equal(ev.target, div, "target");
		assert.equal(ev.oldValue, null, "oldValue");

		assert.equal(div.getAttribute(ev.attributeName), "bar");
		domEvents.removeEventListener.call(div, "attributes", attrHandler1);
	};
	domEvents.addEventListener.call(div, "attributes", attrHandler1);

	domAttr.set(div, "foo", "bar");

	setTimeout(function () {
		var attrHandler = function(ev) {
			assert.ok(true, "removed event handler should be called");

			assert.equal(ev.attributeName, "foo", "attribute name is correct");
			assert.equal(ev.target, div, "target");
			assert.equal(ev.oldValue, "bar", "oldValue should be 'bar'");

			assert.equal(div.getAttribute(ev.attributeName), null, "value of the attribute should be null after the remove.");

			domEvents.removeEventListener.call(div, "attributes", attrHandler);
			done();
		};
		domEvents.addEventListener.call(div, "attributes", attrHandler);
		domAttr.remove(div, "foo");

	}, 50);

});

unit.test("attr events without MUTATION_OBSERVER", function (assert) {
	assert.expect(9);
	var done = assert.async();
	var MO = getMutationObserver();
	getMutationObserver(null);

	var div = document.createElement("div");

	var attrHandler1 = function(ev) {
		assert.equal(ev.attributeName, "foo", "attribute name is correct");
		assert.equal(ev.target, div, "target");
		assert.equal(ev.oldValue, null, "oldValue");

		assert.equal(div.getAttribute(ev.attributeName), "bar");
		domEvents.removeEventListener.call(div, "attributes", attrHandler1);
	};
	domEvents.addEventListener.call(div, "attributes", attrHandler1);

	domAttr.set(div, "foo", "bar");

	setTimeout(function () {
		var attrHandler = function(ev) {
			assert.ok(true, "removed event handler should be called");

			assert.equal(ev.attributeName, "foo", "attribute name is correct");
			assert.equal(ev.target, div, "target");
			assert.equal(ev.oldValue, "bar", "oldValue should be 'bar'");

			assert.equal(div.getAttribute(ev.attributeName), null, "value of the attribute should be null after the remove.");

			domEvents.removeEventListener.call(div, "attributes", attrHandler);
			getMutationObserver(MO);
			done();
		};
		domEvents.addEventListener.call(div, "attributes", attrHandler);
		domAttr.remove(div, "foo");

	}, 50);

});



unit.test("attr.set CHECKED attribute works", function (assert) {

	var input = document.createElement("input");
	input.type = "checkbox";

	document.getElementById("qunit-fixture").appendChild(input);

	domAttr.set(input, "CHECKED");
	assert.equal(input.checked, true);

	input.checked = false;

	domAttr.set(input, "CHECKED");

	assert.equal(input.checked, true);
	document.getElementById("qunit-fixture").removeChild(input);
});

if (!isServer()) {
	unit.test("Map special attributes", function (assert) {

		var div = document.createElement("label");

		document.getElementById("qunit-fixture").appendChild(div);

		domAttr.set(div, "for", "my-for");
		assert.equal(div.htmlFor, "my-for", "Map for to htmlFor");

		if('innerText' in div) {
			domAttr.set(div, "innertext", "my-inner-text");
			assert.equal(div.innerText, "my-inner-text", "Map innertext to innerText");
		}

		domAttr.set(div, "textcontent", "my-content");
		assert.equal(div.textContent, "my-content", "Map textcontent to textContent");

		document.getElementById("qunit-fixture").removeChild(div);
		div = document.createElement("input");
		div.type = "text";
		document.getElementById("qunit-fixture").appendChild(div);

		domAttr.set(div, "readonly");
		assert.equal(div.readOnly, true, "Map readonly to readOnly");

		domAttr.set(div, "readonly", false);
		assert.equal(div.readOnly, false, "not readonly");
		domAttr.set(div, "readonly", "");
		assert.equal(div.readOnly, true, "readonly again");

		document.getElementById("qunit-fixture").removeChild(div);
	});
}

/*
	can-simple-dom does not support createElementNS.
*/
var supportsCreateElementNs = !isServer();
if (supportsCreateElementNs) {
	unit.test('set class attribute via className or setAttribute for svg (#2015)', function (assert) {
		var div = document.createElement('div');
		var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
		var obj = { toString: function() { return 'my-class'; } };

		domAttr.set(div, 'class', 'my-class');
		assert.equal(div.getAttribute('class'), 'my-class', 'class mapped to className');

		domAttr.set(div, 'class', undefined);
		assert.equal(div.getAttribute('class'), '', 'an undefined className is an empty string');

		domAttr.set(div, 'class', obj);
		assert.equal(div.getAttribute('class'), 'my-class', 'you can pass an object to className');

		domAttr.set(svg, 'class', 'my-class');
		assert.equal(svg.getAttribute('class'), 'my-class', 'svg class was set as an attribute');

		domAttr.set(svg, 'class', undefined);
		assert.equal(svg.getAttribute('class'), '', 'an undefined svg class is an empty string');

		domAttr.set(svg, 'class', obj);
		assert.equal(svg.getAttribute('class'), 'my-class', 'you can pass an object to svg class');
	});

	unit.test("set xlink:href attribute via setAttributeNS for svg-use (#2384)", function (assert) {
		var use = document.createElementNS("http://www.w3.org/2000/svg", "use");

		domAttr.set(use, "xlink:href", "svgUri");
		assert.equal(use.getAttributeNS("http://www.w3.org/1999/xlink", "href"), "svgUri", "svg-use xlink:href was set with setAttributeNS");
	});
}

unit.test("attr.special addEventListener allows custom binding", function (assert) {
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
		assert.equal(times, 1, "addEventListener called");
	};
	domEvents.addEventListener.call(div, "foo", handler);

	domAttr.set(div, "foo", "bar");

	domEvents.removeEventListener.call(div, "foo", handler);

	// Shouldn't happen again.
	domAttr.set(div, "foo", "baz");
	delete domAttr.special.foo;
});

unit.test("'selected' is bindable on an <option>", function (assert) {
	var select = document.createElement("select");
	var option1 = document.createElement("option");
	option1.value = "one";
	var option2 = document.createElement("option");
	option2.value = "two";
	select.appendChild(option1);
	select.appendChild(option2);

	domEvents.addEventListener.call(option2, "selected", function(){
		assert.ok(true, "selected was called on the option");
	});

	option2.selected = true;
	domDispatch.call(select, "change");

	assert.equal(domAttr.get(option1, "selected"), false, "option1 is not selected");
	assert.equal(domAttr.get(option2, "selected"), true, "option2 is selected");
});

if (!isServer()) {
	unit.test("get, set, and addEventListener on values", function (assert) {
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

		assert.deepEqual(domAttr.get(select, "values"), [], "None selected to start");

		option1.selected = true;
		domDispatch.call(select, "change");

		assert.equal(valuesCount, 1, "values event");
		assert.deepEqual(domAttr.get(select, "values"), ["one"], "First option is in values");

		option2.selected = true;
		domDispatch.call(select, "change");

		assert.equal(valuesCount, 2, "values event");
		assert.deepEqual(domAttr.get(select, "values"), ["one", "two"], "both selected");

		option1.selected = option2.selected = false;
		domDispatch.call(select, "change");

		assert.equal(valuesCount, 3, "values event");
		assert.deepEqual(domAttr.get(select, "values"), [], "none selected");

		domAttr.set(select, "values", ["two"]);

		assert.equal(option1.selected, false, "option1 not selected");
		assert.equal(option2.selected, true, "option2 selected");
		assert.deepEqual(domAttr.get(select, "values"), ["two"], "two is only selected");
	});
}

unit.test("get, set, and addEventListener on innerHTML", function (assert) {
	var div = document.createElement("div");
	div.appendChild(document.createElement("span"));

	var count = 0;
	domEvents.addEventListener.call(div, "innerHTML", function(){
		count++;
	});

	assert.equal(domAttr.get(div, "innerHTML"), "<span></span>", "got innerhtml");

	domAttr.set(div, "innerHTML", "<p>hello</p>");
	domDispatch.call(div, "change");
	assert.equal(count, 1, "innerHTML event");

	assert.equal(domAttr.get(div, "innerHTML"), "<p>hello</p>", "got innerhtml");
});

unit.test("get, set on 'value'", function (assert) {
	var input = document.createElement("input");
	input.value = "foo";

	assert.equal(domAttr.get(input, "value"), "foo", "got the value");

	domAttr.set(input, "value", "bar");
	assert.equal(domAttr.get(input, "value"), "bar", "got the value");

	input.value = "";
	assert.equal(domAttr.get(input, "value"), "", "value is an empty string");
});

unit.test("get/sets the checkedness of a checkbox", function (assert) {
	var input = document.createElement("input");
	input.type = "checkbox";

	assert.equal(domAttr.get(input, "checked"), false, "not checked");

	domAttr.set(input, "checked", true);
	assert.equal(domAttr.get(input, "checked"), true, "now it is true");

	domAttr.set(input, "checked", false);
	assert.equal(domAttr.get(input, "checked"), false, "now it is false");

	domAttr.set(input, "checked");
	assert.equal(domAttr.get(input, "checked"), true, "now it is true");

	domAttr.set(input, "checked", 0);
	assert.equal(domAttr.get(input, "checked"), false, "now it is false");

	domAttr.set(input, "checked", "");
	assert.equal(domAttr.get(input, "checked"), true, "now it is true");
});

if (!isServer()) {
	unit.test("For inputs checked is set as an attribute", function (assert) {
		var input = document.createElement("input");
		input.type = "checkbox";

		domAttr.set(input, "checked", "");
		assert.equal(input.checked, true, "checked is true");
		assert.equal(input.getAttribute("checked"), undefined, "no checked attr");

		var customEl = document.createElement("custom-element");

		domAttr.set(customEl, "checked", "");
		assert.ok(customEl.hasAttribute("checked"), "has checked attr");
		assert.equal(customEl.getAttribute("checked"), "", "attr is an empty string");
		assert.equal(domAttr.get(customEl, "checked"), "", "attr from get");
	});

	unit.test("attr.special.value, fallback to the attribute", function (assert) {
		var customEl = document.createElement("custom-element");
		customEl.setAttribute("value", "foo");

		assert.equal(domAttr.get(customEl, "value"), "foo", "value is foo");
	});

unit.test("Setting a select's value updates child's selectedness", function (assert) {
	var select = document.createElement("select");
	var option1 = document.createElement("option");
	option1.value = "one";
	option1.selected = true;
	var option2 = document.createElement("option");
	option2.value = "two";

	select.appendChild(option1);
	select.appendChild(option2);

	assert.equal(domAttr.get(select, "value"), "one", "initial value");

	domAttr.set(select, "value", "two");
	assert.equal(option1.selected, false, "not selected");
	assert.equal(option2.selected, true, "now it is selected");
});
}

unit.test("Removing an option causes the select's value to be re-evaluated", function (assert) {
		var done = assert.async();
		var select = document.createElement("select");
		var option1 = document.createElement("option");
		option1.value = "one";

		var option2 = document.createElement("option");
		option2.value = "two";

		select.appendChild(option1);
		select.appendChild(option2);

		domAttr.set(select, "value", "one");
		assert.equal(option1.selected, true, "selected");
		assert.equal(domAttr.get(select, "value"), "one", "got the value");

		domEvents.addEventListener.call(select, "change", function(){
			assert.equal(domAttr.get(select, "value"), undefined, "no value now");
			done();
		});


		select.removeChild(option1);
		if(!getMutationObserver()) {
			var data = domData.get.call(select, "canBindingCallback");
			data.onMutation();
		}
	});

if (!isServer()) {
	unit.test("Multiselect values is updated on any children added/removed", function (assert) {
		var done = assert.async();
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
		assert.deepEqual(domAttr.get(select, "values"), ["one", "three"], "initial value is right");

		domEvents.addEventListener.call(select, "values", function(){
			assert.deepEqual(domAttr.get(select, "values"), ["three"], "new val is right");
			done();
		});

		select.removeChild(option1);
		if(!getMutationObserver()) {
			var data = domData.get.call(select, "canBindingCallback");
			data.onMutation();
		}
	});
}

if (!isServer()) {
	unit.test("Select options within optgroups should be set via `value` properly", function (assert) {
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

		assert.equal(domAttr.get(select, 'value'), 'list1-item1', 'initial value');

		domAttr.set(select, 'value', 'list2-item2');
		assert.equal(domAttr.get(select, 'value'), 'list2-item2', 'updated value');
		assert.equal(option11.selected, false, 'initial option is not selected');
		assert.equal(option22.selected, true, 'second option is selected');
	});

	unit.test("Select options within optgroups should be set via `values` properly", function (assert) {
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

		assert.deepEqual(domAttr.get(select, 'values'), ['list1-item1'], 'initial value');

		domAttr.set(select, 'values', ['list1-item2', 'list2-item2']);
		assert.deepEqual(domAttr.get(select, 'values'), ['list1-item2', 'list2-item2'], 'updated value');
		assert.equal(option11.selected, false, 'initial option is not selected');
		assert.equal(option12.selected, true, 'second option is selected');
		assert.equal(option22.selected, true, 'third option is selected');
	});

	unit.test("Setting a value that will be appended later", function (assert) {
		var done = assert.async();
		var select = document.createElement("select");
		var option1 = document.createElement("option");
		option1.value = "one";

		domAttr.set(select, "value", "two");

		var option2 = document.createElement("option");
		option2.value = "two";

		domEvents.addEventListener.call(select, "change", function(){
			assert.equal(domAttr.get(select, "value"), "two", "option2 is selected");
			done();
		});

		select.appendChild(option2);
		if(!getMutationObserver()) {
			var data = domData.get.call(select, "canBindingCallback");
			data.onMutation();
		}
	});
}

unit.test("Calling remove on checked sets it to false", function (assert) {
	var input = document.createElement("input");
	input.type = "checkbox";

	domAttr.set(input, "checked");
	assert.equal(input.checked, true, "it is checked");

	domAttr.remove(input, "checked");
	assert.equal(input.checked, false, "not checked");
});

unit.test("Boolean attrs that don't support a prop sets the attribute", function (assert) {
	var div = document.createElement("div");
	domAttr.set(div, "disabled");

	assert.equal(domAttr.get(div, "disabled"), "", "empty string");
});

unit.test("Setting a non-string value on a select correctly selects the child", function (assert) {
	var select = document.createElement("select");
	var option1 = document.createElement("option");
	option1.value = "1";
	var option2 = document.createElement("option");
	option2.value = "2";

	select.appendChild(option1);
	select.appendChild(option2);

	domAttr.set(select, "value", 2);
	assert.equal(option2.selected, true, "second one is selected");
});

unit.test("Setting null doesn't select the default value on a select", function (assert) {
	var select = document.createElement("select");
	var option1 = document.createElement("option");
	option1.value = '';
	var option2 = document.createElement("option");
	option2.value = "two";

	select.appendChild(option1);
	select.appendChild(option2);

	// This is really stupid
	domAttr.set(select, "value", null);
	assert.equal(option1.selected, false, "option1 not selected");
	assert.equal(option2.selected, false, "option2 not selected");
	assert.equal(select.selectedIndex, -1, "no selected index, wha-wha");
});

unit.test("setting .value on an input to undefined or null makes value empty (#83)", function (assert) {
	var input = document.createElement("input");
	input.value = "something";
	domAttr.set(input, "value", null);
	assert.equal(input.value, "", "null");
	domAttr.set(input, "value", undefined);
	assert.equal(input.value, "", "undefined");
});

unit.test("setting .value on a textarea to undefined or null makes value empty", function (assert) {
	var textarea = document.createElement("textarea");
	textarea.value = "something";
	domAttr.set(textarea, "value", null);
	assert.equal(textarea.value, "", "null");
	domAttr.set(textarea, "value", undefined);
	assert.equal(textarea.value, "", "undefined");
});

if (!isServer()) {
	unit.test("attr.special.focused calls after previous events", function (assert) {
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

		var done = assert.async();

		domAttr.set(input, "focused", true);
		setTimeout(function(){
			assert.equal(domAttr.get(input, "focused"), true, "it is now focused");
			types.queueTask = oldQueue;
			done();
		}, 10);

		assert.equal(domAttr.get(input, "focused"), false, "not focused yet");
	});

	unit.test("attr.special.focused binds on inserted if element is detached", function(assert) {
		assert.expect(2);
		var input = document.createElement("input");
		input.type = "text";
		var ta = document.getElementById("qunit-fixture");

		var done = assert.async();
		domAttr.set(input, "focused", true);
		assert.equal(domAttr.get(input, "focused"), false, "not focused yet");
		domEvents.addEventListener.call(input, "inserted", function() {
			assert.equal(domAttr.get(input, "focused"), true, "it is now focused");
			done();
		});
		mutate.appendChild.call(ta, input);

	});
}

unit.test("handles removing multiple event handlers", function (assert) {
	var handler1 = function() {};
	var handler2 = function() {};

	var div = document.createElement('div');

	domEvents.addEventListener.call(div, "attributes", handler1, false);
	domEvents.addEventListener.call(div, "attributes", handler2, false);

	domEvents.removeEventListener.call(div, "attributes", handler1);
	domEvents.removeEventListener.call(div, "attributes", handler2);

	assert.ok(true, 'should not throw');
});

unit.test("handles removing multiple event handlers without MUTATION_OBSERVER", function (assert) {
	var MO = getMutationObserver();
	getMutationObserver(null);
	var handler1 = function() {};
	var handler2 = function() {};

	var div = document.createElement('div');

	domEvents.addEventListener.call(div, "attributes", handler1, false);
	domEvents.addEventListener.call(div, "attributes", handler2, false);

	domEvents.removeEventListener.call(div, "attributes", handler1);
	domEvents.removeEventListener.call(div, "attributes", handler2);

	assert.ok(true, 'should not throw');
	getMutationObserver(MO);
});

// TODO: https://github.com/canjs/can-util/issues/320
unit.skipOnServer('get, set, and addEventListener on focused', function (assert) {
	var done = assert.async();
	var input = document.createElement("input");
	var ta = document.getElementById("qunit-fixture");
	var test;
	var focusedCount = 0;

	ta.appendChild(input);

	var tests = [
		{
			action: function(){
				assert.equal( domAttr.get(input, "focused"), false, "get not focused" );

				domAttr.set(input, "focused", true);
				if(!document.hasFocus()) {
					domDispatch.call(input, "focus");
				}
			},
			test: function(){
				assert.equal(focusedCount, 1, "focused event");
				assert.equal( domAttr.get(input,"focused"), true, "get focused" );
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
				assert.equal(focusedCount, 2, "focused event");
				assert.equal( domAttr.get(input,"focused"), false, "get not focused after blur" );
			}
		}
	];

	function next(){
		test = tests.shift();
		if(!test) {
			done();
			return;
		}

		// Calling the action will trigger an event below, that event will then
		// call test.test() to make sure it works. This is b/c IE10 fires focus
		// asynchronously.
		test.action();
	}

	// fired on blur and focus events
	assert.ok(domAttr.special.focused.addEventListener, "addEventListener implemented");
	domEvents.addEventListener.call(input, "focused", function(){
		focusedCount++;

		test.test();
		setTimeout(next, 50);
	});

	next();
});

unit.test("Binding to selected updates the selectedness of options", function (assert) {
	assert.expect(3);
	var select = document.createElement("select");
	var option1 = document.createElement("option");
	option1.selected = false;
	option1.value = "one";
	select.appendChild(option1);

	var option2 = document.createElement("option");
	option2.value = "two";
	select.appendChild(option2);

	domEvents.addEventListener.call(option1, "selected", function(){
		assert.ok(true, "this was called");
	});

	domAttr.set(option1, "selected", true);

	option2.selected = true;
	domDispatch.call(select, "change");

	assert.equal(option2.selected, true);
	assert.equal(option1.selected, false);
});

unit.test("Select's value is preserved when inserted into the document", function (assert) {
	var done = assert.async();
	var select = document.createElement("select");
	var option1 = document.createElement("option");
	option1.value = "one";
	select.appendChild(option1);

	domAttr.set(select, "value", null);

	assert.equal(select.selectedIndex, -1, "was set to -1");

	var ta = document.getElementById("qunit-fixture");
	mutate.appendChild.call(ta, select);

	setTimeout(function(){
		assert.equal(select.selectedIndex, -1, "still is -1");
		done();
	}, 50);

});

unit.test('multi-select does not dispatch a values change event if its selected options are unchanged (#105)', function (assert) {
	var done = assert.async();
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

	setTimeout(function() {
		assert.strictEqual(valuesChanges, 0, 'we do not dispatch a change event');
		document.body.removeChild(div);
		done();
	}, 50);
});

unit.test('setting checked to undefined should result in false for checkboxes (#184)', function (assert) {
	var input = document.createElement('input');
	input.type = 'checkbox';

	domAttr.set(input, 'checked', undefined);
	assert.equal(input.checked, false, 'Should set checked to false');

	domAttr.set(input, 'checked', true);
	assert.equal(input.checked, true, 'Should become true');
	domAttr.set(input, 'checked', undefined);
	assert.equal(input.checked, false, 'Should become false again');
});

unit.test("set attribute with namespaces (#309)", function (assert) {
	var div = document.createElement('div');

	domAttr.set(div, 'foo:bar', 'value');
	assert.equal(domAttr.get(div,'foo:bar'), 'value');
});
