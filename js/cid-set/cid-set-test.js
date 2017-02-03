var QUnit = require('../../test/qunit');
var CIDSet = require('./cid-set');

QUnit.module("can-util/js/cid-set");

QUnit.test("basics", function(){
	var o1 = {},
		o2 = {};

	var set = new CIDSet();

	set.add(o1);
	set.add(o2);

	QUnit.ok( set.has(o1));
	QUnit.ok( set.has(o2));

	QUnit.equal(set.size, 2);

	set.clear();

	QUnit.equal(set.size, 0);
});
