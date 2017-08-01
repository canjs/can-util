'use strict';

var LOCATION = require('./location');
var QUnit = require('../../test/qunit');

QUnit.module("can-util/dom/location/location");

QUnit.test("Can set a location", function(){
	var myLoc = {};
	var oldLoc = LOCATION();
	LOCATION(myLoc);

	QUnit.equal(LOCATION(), myLoc, "It was set");
	LOCATION(oldLoc);
});
