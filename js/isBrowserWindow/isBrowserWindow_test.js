var isBrowserWindow = require('can-util/js/isBrowserWindow/');
var QUnit = require('steal-qunit');

QUnit.module("can-util/js/isBrowserWindow")

QUnit.test("basics", function(){
	equal(typeof isBrowserWindow(), "boolean");
});
