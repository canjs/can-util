'use strict';

var QUnit = require('../../test/qunit');
var isPromise = require('./is-promise-like');

QUnit.module("can-util/js/is-promise-like");

QUnit.test("basics", function(assert){
	assert.ok(isPromise({ then: function(){} }));
});
