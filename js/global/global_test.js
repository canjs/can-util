var getGlobal = require('can-util/js/global/');
var isBrowserWindow = require("../isBrowserWindow/");
var QUnit = require('steal-qunit');

QUnit.module("can-util/js/global")

QUnit.test("basics", function(){
	if(isBrowserWindow()) {
		ok(getGlobal() === window);
	} else {
		ok(getGlobal() === global);
	}
});
