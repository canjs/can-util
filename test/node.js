'use strict';

require('can-vdom');
global.XMLHttpRequest = require('xmlhttprequest2').XMLHttpRequest;
// Qunit mucks with require on the global object
global.require = require;

function createFixture () {
	var fixture = document.createElement('div');
	fixture.setAttribute('id', 'qunit-fixture');
	return fixture;
}

function setupFixture () {
	var fixture = createFixture();
	document.body.appendChild(fixture);
	return fixture;
}

var fixture = setupFixture();

function cleanFixture () {
	fixture.innerHTML = '';
}

var QUnit = require('./qunit');
QUnit.testStart(cleanFixture);

require('../dom/attr/attr-test');
require('../dom/mutate/mutate-test');
require('../dom/data/data-test');
require('../dom/dispatch/dispatch-test');
require('../dom/events/delegate/delegate-test');
require('../dom/events/inserted/inserted-test');
require('../dom/events/removed/removed-test'); // conflicts with attr tests
require('../dom/matches/matches-test');

require('../js/tests');
