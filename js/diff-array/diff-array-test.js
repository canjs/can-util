'use strict';

var QUnit = require('../../test/qunit');
var diffArray = require('./diff-array');

QUnit.module("can-util/js/diff-array");

QUnit.test("basics", function(assert){

	var patches = diffArray([], [1,2,3]);
	assert.deepEqual(patches, [{
		index: 0,
		deleteCount: 0,
		insert: [1,2,3]
	}], "insert many at end");

	patches = diffArray([1,2,3], [1,2,3]);
	assert.deepEqual(patches,[],"no changes");

	patches = diffArray([1,2,3],[1,2,3,4]);
	assert.deepEqual(patches, [{
		index: 3,
		deleteCount: 0,
		insert: [4]
	}],"add one at the end");

	patches = diffArray([1,2,3,4], [1,2,4]);

	assert.deepEqual(patches, [{
		index: 2,
		deleteCount: 1,
		insert: []
	}],"remove one in the middle");

	patches = diffArray(
		["a","b","z","f","x"],
		["a","b","f","w","z"]);
	// delete 1 at 2
	// delete 1 at 3, insert 2
	assert.deepEqual(patches, [
		{
			index: 2,
			deleteCount: 1,
			insert: []
		},{
			index: 3,
			deleteCount: 1,
			insert: ["w","z"]
		}], "can delete one");

	patches = diffArray(["a","b","b"],["c","a","b"]);
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
	// a, X, c, d, e, f, g
	// a, X, c, X, e, f, g
	// a, X, c, X, e, X, g
	patches = diffArray(["a","b","c","d","e","f","g"],["a","c","e","g"]);
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

});

QUnit.test("handle swaps at the end (#193)", function(assert){

	var patches = diffArray(
		["a", "b", "c", "d", "e"],
		["a", "x", "y", "z", "e"]);

	assert.deepEqual(patches,[
		{
			index: 1,
			deleteCount: 3,
			insert: ["x","y","z"]
		}
	],"handle reverse patch");

});


QUnit.test("handle swaps at the end after a delete (#193)", function(assert){

	var patches = diffArray(
		["a", "b", "c", "d", "e"],
		["a", "x", "b", "y", "z", "e"]);

	assert.deepEqual(patches,[
		{
			index: 1,
			deleteCount: 0,
			insert: ["x"]
		},
		{
			index: 3,
			deleteCount: 2,
			insert: ["y","z"]
		}
	],"handle reverse patch");

});
