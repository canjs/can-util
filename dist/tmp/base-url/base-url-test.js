import QUnit from '../../test/qunit';
import getBaseUrl from './base-url';
import getGlobal from '../global/global';
import getDomDocument from '../../dom/document/document';


QUnit.module('can-util/js/base-url');

test('basics', function () {
	var global = getGlobal(),
	    domDocument = getDomDocument();

	if (domDocument && 'baseURI' in domDocument) {
		ok(getBaseUrl() === global.document.baseURI, getBaseUrl());
	} else if (global.location) {
		ok(getBaseUrl() === global.location.href.substr(0, global.location.href.lastIndexOf("/")), getBaseUrl());
	} else if (typeof process !== 'undefined') {
		ok(getBaseUrl() === process.cwd(), getBaseUrl());
	}
});