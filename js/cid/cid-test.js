var cid = require('can-util/js/cid/');
var QUnit = require('steal-qunit');

QUnit.module("can-util/js/cid");

QUnit.test("assigns incremental ids", function(){
	var objects = [{}, {}, {}, {}, {}],
		ref = parseInt(cid({}), 10) + 1;

	for(var i = 0; i < objects.length; i++){
		equal(i+ref, cid(objects[i]), "cid function returns the id");
	}

	for(var i = 0; i < objects.length; i++){
		equal(i+ref, objects[i]._cid, "cid function assigns the ids");
	}
});

QUnit.test("assigns id based on name", function(){
	var reference = {},
		named = {},
		id_num = parseInt(cid(reference), 10) + 1,
		id_full = cid(named, "name");

	equal(named._cid, "name" + id_num);

})