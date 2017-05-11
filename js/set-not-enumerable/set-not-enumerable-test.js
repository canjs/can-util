'use strict';

var QUnit = require('../../test/qunit');
var setNotEnumerable = require('./set-not-enumerable');

QUnit.module("can-util/js/set-not-enumerable");

QUnit.test("basics",0, function(){
	var obj = {};
	setNotEnumerable(obj,"prop","val");
	for(var prop in obj) {
		ok(false, prop);
	}

});
