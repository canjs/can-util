var QUnit = require('../../test/qunit');
var getGlobal = require('./global');
var isBrowserWindow = require('../is-browser-window/is-browser-window');

QUnit.module("can-util/js/global");

test("basics", function(){
	if(isBrowserWindow()) {
		ok(getGlobal() === window);
	} else {
		ok(getGlobal() === global);
	}
});
