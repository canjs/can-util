'use strict';

var QUnit = require('../../test/qunit');
var isBrowserWindow = require('./is-browser-window');

QUnit.module("can-util/js/is-browser-window");

QUnit.test("basics", function(){
	equal(typeof isBrowserWindow(), "boolean");
});
