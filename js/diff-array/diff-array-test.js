'use strict';

var QUnit = require('../../test/qunit');
var diffArray = require('./diff-array');

QUnit.module("can-util/js/diff-array");

QUnit.test("basics", function(){

	var patches = diffArray([], [1,2,3]);
	deepEqual(patches, [{
		index: 0,
		deleteCount: 0,
		insert: [1,2,3]
	}], "insert many at end");

	patches = diffArray([1,2,3], [1,2,3]);
	deepEqual(patches,[],"no changes");

	patches = diffArray([1,2,3],[1,2,3,4]);
	deepEqual(patches, [{
		index: 3,
		deleteCount: 0,
		insert: [4]
	}],"add one at the end");

	patches = diffArray([1,2,3,4], [1,2,4]);

	deepEqual(patches, [{
		index: 2,
		deleteCount: 1,
		insert: []
	}],"remove one in the middle");

	patches = diffArray(["a","b","z","f","x"],["a","b","f","w","z"]);
	deepEqual(patches, [{
		index: 2,
		insert: [],
		deleteCount: 1
	},{
		index: 3,
		deleteCount: 1,
		insert: ["w","z"]
	}]);

	patches = diffArray(["a","b","b"],["c","a","b"]);
	deepEqual(patches, [{
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
	patches = diffArray(["a","b","c","d","e","f","g"],["a","c","e","g"]);
	deepEqual(patches, [{
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
