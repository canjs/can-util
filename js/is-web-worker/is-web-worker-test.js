'use strict';

var QUnit = require('../../test/qunit');
var isWebWorker = require('./is-web-worker');

QUnit.module("can-util/js/is-web-worker");

QUnit.test("basics", function(assert){
	assert.equal(typeof isWebWorker() , "boolean");
});
