'use strict';

var QUnit = require('../../test/qunit');
var each  = require('./each');
var canSymbol = require("can-symbol");

QUnit.module('can-util/js/each');

// The following test is from jQuery’s solution to this bug:
// https://github.com/jquery/jquery/pull/2185
QUnit.test('iOS 8 64-bit JIT object length bug', function (assert) {
	assert.expect(4);

	var i;
	for (i = 0; i < 1000; i++) {
		each([]);
	}

	i = 0;
	each({1: '1', 2: '2', 3: '3'}, function (index) {
		assert.equal(++i, index, 'Iterate over object');
	});
	assert.equal(i, 3, 'Last index should be the length of the array');
});

QUnit.test('#1989 - isArrayLike needs to check for object type', function(assert) {
  try {
    each(true, function(index) { });
    assert.ok(true, 'each on true worked');
  } catch(e) {
    assert.ok(false, 'Should not fail');
  }
});

QUnit.test("objects that implement iterators work", function(assert) {
	var Ctr = function(){};
	Ctr.prototype[canSymbol.iterator || canSymbol.for("iterator")] = function(){
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
		assert.equal(key, "a");
		assert.equal(value, "b");
	});
});
