'use strict';

var LOCATION = require('./location');
var unit = require('../../test/qunit');

unit.module('can-util/dom/location/location');

unit.test('Can set a location', function (assert) {
	var myLoc = {};
	var oldLoc = LOCATION();
	LOCATION(myLoc);

	assert.equal(LOCATION(), myLoc, 'It was set');
	LOCATION(oldLoc);
});
