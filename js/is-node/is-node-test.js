'use strict';

var QUnit = require('../../test/qunit');
var isNode = require('./is-node');

QUnit.module("can-util/js/is-node");

QUnit.test("basics", function(assert){
	assert.equal(typeof isNode(), "boolean");
});
