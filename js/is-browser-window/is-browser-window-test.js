var isBrowserWindow = require('can-util/js/is-browser-window/');
var QUnit = require('steal-qunit');

QUnit.module("can-util/js/is-browser-window");

QUnit.test("basics", function(){
	equal(typeof isBrowserWindow(), "boolean");
});
