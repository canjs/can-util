'use strict';

var QUnit = require('../../test/qunit');
var isWebWorker = require('./is-web-worker');

QUnit.module("can-util/js/is-web-worker");

QUnit.test("basics", function(){
	QUnit.equal(typeof isWebWorker() , "boolean");
});
