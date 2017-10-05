'use strict';

var QUnit = require('../../test/qunit');
var isFunction = require('./is-function');

QUnit.module("can-util/js/is-function");

QUnit.test("basics", function(assert){
	assert.ok(isFunction(function(){}));
});
