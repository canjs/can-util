'use strict';

var QUnit = require('../../test/qunit');
var isNode = require('./is-node');

QUnit.module("can-util/js/is-node");

test("basics", function(){
	QUnit.equal(typeof isNode(), "boolean");
});
