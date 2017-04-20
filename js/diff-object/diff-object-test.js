'use strict';

var QUnit = require('../../test/qunit');
var diffObject = require('./diff-object');

QUnit.module("can-util/js/diff");

QUnit.test("basics", function(){
		var patches = diffObject({}, {a:'foo'});
		deepEqual(patches, [{
			property: 'a',
			type: 'add',
			value: 'foo'
		}], "add property");

		patches = diffObject(null, {a:'foo'});
		deepEqual(patches, [{
			property: 'a',
			type: 'add',
			value: 'foo'
		}], "add property - oldObject null");

		patches = diffObject({a: 'foo'}, {a:'bar'});
		deepEqual(patches, [{
			property: 'a',
			type: 'set',
			value: 'bar'
		}], "change property");

		patches = diffObject({a: 'foo'}, {});
		deepEqual(patches, [{
			property: 'a',
			type: 'remove'
		}], "remove property");

		patches = diffObject({a: 'foo', b: 'baz'}, {a: 'bar', c: 'quz'});
		deepEqual(patches, [{
			property: 'a',
			type: 'set',
			value: 'bar'
		}, {
			property: 'c',
			type: 'add',
			value: 'quz'
		}, {
			property: 'b',
			type: 'remove'
		}], "add, set, and remove");
});

QUnit.test("mutation test", function(){
	var oldObject = {a: 'foo', b: 'baz'};
	var newObject = {a: 'bar', c: 'quz'};

	diffObject(oldObject, newObject);
	deepEqual(oldObject, {a: 'foo', b: 'baz'}, 'should not mutate old object');
	deepEqual(newObject, {a: 'bar', c: 'quz'}, 'should not mutate new object');
});
