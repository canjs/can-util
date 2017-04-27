'use strict';

var QUnit = require('../../test/qunit');
var CIDMap = require('./cid-map');

QUnit.module("can-util/js/cid-map");

QUnit.test("basics", function(){
	var o1 = {},
		o2 = {},
		o3 = {};

	var map = new CIDMap();

	map.set(o1,"o1");
	map.set(o2,"o2");

	QUnit.equal( map.get(o1), "o1");
	QUnit.equal( map.get(o2), "o2");
	QUnit.equal( map.get(o3), undefined);

	QUnit.equal(map.size, 2);

	map.clear();

	QUnit.equal(map.size, 0);
});


QUnit.test("forEach", function(){
	var o1 = {},
		o2 = {};

	var map = new CIDMap();

	map.set(o1,"o1");
	map.set(o2,"o2");


	map.forEach(function(value, key){
		if(value === "o1") {
			QUnit.equal(key, o1);
		} else if(value === "o2") {
			QUnit.equal(key, o2);
		} else {
			QUnit.ok(false, "key shouldn't be "+value);
		}
	});
});
