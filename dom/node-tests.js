'use strict';

require('can-vdom');
global.XMLHttpRequest = require('xmlhttprequest2').XMLHttpRequest;

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

var QUnit = require('../test/qunit');
QUnit.testStart(cleanFixture);

require('./attr/attr-test');
require('./mutate/mutate-test');
require('./data/data-test');
require('./dispatch/dispatch-test');
require('./events/delegate/delegate-test');
require('./events/inserted/inserted-test');
require('./events/removed/removed-test'); // conflicts with attr tests
require('./matches/matches-test');
