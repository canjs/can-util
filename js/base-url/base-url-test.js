'use strict';

var QUnit = require('../../test/qunit');
var getBaseUrl = require('./base-url');
var getGlobal = require('../global/global');
var getDomDocument = require('../../dom/document/document');

QUnit.module('can-util/js/base-url');

test('basics', function(){
	var global = getGlobal(),
		domDocument = getDomDocument();

	if (domDocument && 'baseURI' in domDocument) {
		ok(getBaseUrl() === global.document.baseURI, getBaseUrl());
	} else if(global.location) {
		ok(getBaseUrl() === global.location.href.substr(0, global.location.href.lastIndexOf("/")),getBaseUrl()   );
	} else if(typeof process !== 'undefined') {
		ok(getBaseUrl() === process.cwd(), getBaseUrl());
	}
});
