'use strict';

var QUnit = require('../../test/qunit');
var last = require('./last');

QUnit.module("can-util/js/last");

QUnit.test("basics", function(){
	QUnit.equal(last(["a","b"]), "b");
});
