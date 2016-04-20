var QUnit = require('../../test/qunit');
var cid = require('./cid');

QUnit.module("can-util/js/cid");

QUnit.test("assigns incremental ids", function(){
	var i;
	var objects = [{}, {}, {}, {}, {}];
	var ref = parseInt(cid({}), 10) + 1;

	for(i = 0; i < objects.length; i++){
		equal(i+ref, cid(objects[i]), "cid function returns the id");
	}

	for(i = 0; i < objects.length; i++){
		equal(i+ref, objects[i]._cid, "cid function assigns the ids");
	}
});

QUnit.test("assigns id based on name", function(){
	var reference = {};
	var named = {};
	var id_num = parseInt(cid(reference), 10) + 1;

	cid(named, "name");
	equal(named._cid, "name" + id_num);
});
