'use strict';

var domEvents = require("../events");
require('./enter');

var QUnit = require('../../../test/qunit');

QUnit.module("can-util/dom/events/enter");

var pressKey = function(input, keyCode) {
  domEvents.dispatch.call(input, {
    type: 'keyup',
    keyCode: keyCode
  });
};

QUnit.test("calls enter event handler when enter key is pressed", function() {
  var input = document.createElement("input");
  domEvents.addEventListener.call(input, "enter", function() {
    QUnit.ok(true, "enter key detected");
  });
  pressKey(input, 13);  // enter
});

QUnit.test("does not call enter event handler when a different key is pressed", function() {
  var input = document.createElement("input");
  var enterCount = 0;
  domEvents.addEventListener.call(input, "enter", function() {
    enterCount++;
    QUnit.equal(enterCount, 1, 'enter key pressed');
    QUnit.ok(true, 'passed');
  });
  pressKey(input, 27);  // not enter
  QUnit.equal(enterCount, 0, 'enter key not pressed yet');
  pressKey(input, 13);  // enter!
});

QUnit.test("successfully removes enter event handler", function() {
  var input = document.createElement("input");
  var enterCount = 0;
  var enterEventHandler = function() {
    enterCount++;
    QUnit.equal(enterCount, 1, 'enter key pressed one time');
  };
  domEvents.addEventListener.call(input, "enter", enterEventHandler);
  pressKey(input, 13);  // enter!
  QUnit.equal(enterCount, 1, 'enter handler called once');
  domEvents.removeEventListener.call(input, "enter", enterEventHandler);
  pressKey(input, 13);  // enter!
  QUnit.equal(enterCount, 1, 'enter handler not called after being removed');
});

QUnit.test("can have multiple enter event handlers and can remove them seperately", function() {
  var input = document.createElement("input");
  var enterCount = 0;

  var generateEvtHandler = function() {
    return function() { enterCount++; };
  };
  var firstEvtHandler = generateEvtHandler();
  var secondEvtHandler = generateEvtHandler();
  domEvents.addEventListener.call(input, "enter", firstEvtHandler);
  domEvents.addEventListener.call(input, "enter", secondEvtHandler);

  pressKey(input, 13);  // enter!
  QUnit.equal(enterCount, 2, 'both enter evt handlers called 1x');
  pressKey(input, 13);  // enter!
  QUnit.equal(enterCount, 4, 'both enter evt handlers called 2x');

  domEvents.removeEventListener.call(input, "enter", firstEvtHandler);
  pressKey(input, 13);  // enter!
  QUnit.equal(enterCount, 5, 'one event handler removed, total enters counted = 5');

  domEvents.removeEventListener.call(input, "enter", secondEvtHandler);
  pressKey(input, 13);
  QUnit.equal(enterCount, 5, 'all enter evt handlers removed, enter key pressed, entercount not incremented');
});

QUnit.test("still handles other event types appropriately", function() {
  var button = document.createElement("button");
  domEvents.addEventListener.call(button, "focus", function() {
    QUnit.ok(true, 'handles focus event still');
  });
  domEvents.dispatch.call(button, 'focus');
});
