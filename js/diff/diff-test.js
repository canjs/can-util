'use strict';

var QUnit = require('../../test/qunit');
var diff = require('./diff');

QUnit.module("can-util/js/diff");

QUnit.test("basics", function(assert){

	var patches = diff([], [1,2,3]);
	assert.deepEqual(patches, [{
		index: 0,
		deleteCount: 0,
		insert: [1,2,3]
	}], "insert many at end");

	patches = diff([1,2,3], [1,2,3]);
	assert.deepEqual(patches,[],"no changes");

	patches = diff([1,2,3],[1,2,3,4]);
	assert.deepEqual(patches, [{
		index: 3,
		deleteCount: 0,
		insert: [4]
	}],"add one at the end");

	patches = diff([1,2,3,4], [1,2,4]);

	assert.deepEqual(patches, [{
		index: 2,
		deleteCount: 1,
		insert: []
	}],"remove one in the middle");

	patches = diff(["a","b","z","f","x"],["a","b","f","w","z"]);
	assert.deepEqual(patches, [{
		index: 2,
		insert: [],
		deleteCount: 1
	},{
		index: 3,
		deleteCount: 1,
		insert: ["w","z"]
	}]);

	patches = diff(["a","b","b"],["c","a","b"]);
	assert.deepEqual(patches, [{
		index: 0,
		insert: ["c"],
		deleteCount: 0
	},{
		index: 3,
		deleteCount: 1,
		insert: []
	}]);

	// a, b, c, d, e, f, g
	// a, c, d, e, f, g
	// a, c, e, f, g
	// a, c, e, g
	patches = diff(["a","b","c","d","e","f","g"],["a","c","e","g"]);
	assert.deepEqual(patches, [{
		index: 1,
		insert: [],
		deleteCount: 1
	},{
		index: 2,
		deleteCount: 1,
		insert: []
	},
	{
		index: 3,
		deleteCount: 1,
		insert: []
	}]);

	// identity:
	patches = diff([{id:1},{id:2}], [{id:1},{id:1.5},{id:3}], function(a,b){ return a.id === b.id; });
	assert.deepEqual(patches, [{
		index: 1,
		deleteCount: 1,
		insert: [{id:1.5},{id:3}]
	}], 'identity works');
	
	// identity for a single middle insertion:
	patches = diff([{id:1},{id:2}], [{id:1},{id:3},{id:2}], function(a,b){ return a.id === b.id; });
	assert.deepEqual(patches, [{
		index: 1,
		deleteCount: 0,
		insert: [{id:3}]
	}], 'identity for a single middle insertion');
});
