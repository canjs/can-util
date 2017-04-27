'use strict';

var QUnit = require('../../test/qunit');
var each  = require('./each');
var types = require('can-types');

QUnit.module('can-util/js/each');

// The following test is from jQuery’s solution to this bug:
// https://github.com/jquery/jquery/pull/2185
test('iOS 8 64-bit JIT object length bug', function () {
	expect(4);

	var i;
	for (i = 0; i < 1000; i++) {
		each([]);
	}

	i = 0;
	each({1: '1', 2: '2', 3: '3'}, function (index) {
		equal(++i, index, 'Iterate over object');
	});
	equal(i, 3, 'Last index should be the length of the array');
});

test('#1989 - isArrayLike needs to check for object type', function() {
  try {
    each(true, function(index) { });
    ok(true, 'each on true worked');
  } catch(e) {
    ok(false, 'Should not fail');
  }
});

test("objects that implement iterators work", function() {
	var Ctr = function(){};
	Ctr.prototype[types.iterator] = function(){
		return {
			i: 0,
			next: function(){
				if(this.i === 1) {
					return { value: undefined, done: true };
				}
				this.i++;

				return { value: ["a", "b"], done: false };
			}
		};
	};

	var obj = new Ctr();

	each(obj, function(value, key){
		equal(key, "a");
		equal(value, "b");
	});
});
