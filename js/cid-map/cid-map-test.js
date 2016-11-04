var QUnit = require('../../test/qunit');
var CIDMap = require('./cid-map');

QUnit.module("can-util/js/cid-map");

QUnit.test("basics", function(){
	var o1 = {},
		o2 = {};

	var map = new CIDMap();

	map.set(o1,"o1");
	map.set(o2,"o2");

	QUnit.equal( map.get(o1), "o1");
	QUnit.equal( map.get(o2), "o2");

	QUnit.equal(map.size, 2);

	map.clear();

	QUnit.equal(map.size, 0);
});
