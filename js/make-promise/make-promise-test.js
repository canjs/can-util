'use strict';

var QUnit = require('../../test/qunit');
var isPromise = require('../is-promise/is-promise');
var makePromise = require('./make-promise');

QUnit.module("can-util/js/make-promise");

QUnit.test("basics", function(assert){
	var obj = {
		fail: function() {},
		then: function() {}
	};
	var promise = makePromise(obj);
	assert.ok(isPromise(promise));
	
	obj = {
		catch: function() {},
		then: function() {}
	};
	promise = makePromise(obj);
	assert.ok(isPromise(promise));
});
