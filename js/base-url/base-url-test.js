var QUnit = require('../../test/qunit');
var getBaseUrl = require('./base-url');
var isBrowserWindow = require('../is-browser-window/is-browser-window');

QUnit.module("can-util/js/base-url");

test("basics", function(){
	if(isBrowserWindow()) {
		ok(getBaseUrl() === window.location.href.substr(0, window.location.href.lastIndexOf("/")),getBaseUrl()   );
	} else {
		ok(getBaseUrl() === process.cwd(), getBaseUrl());
	}
});
