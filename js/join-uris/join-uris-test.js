'use strict';

var QUnit = require('../../test/qunit');
var joinURIs = require('./join-uris');

QUnit.module("can-util/js/join-uris");

QUnit.test("basics", function(assert){
	assert.deepEqual(joinURIs("foo/bar/car.html", "../zed.html"), "foo/zed.html");
});
