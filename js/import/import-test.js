var QUnit = require('../../test/qunit');
var load = require('./import');

QUnit.module('can-util/js/import');

QUnit.asyncTest('basic can-import works', function() {
	load('can-util/js/import/testmodule').then(function(data) {
		QUnit.equal(data, 'Hello world');
		start();
	});
});
