'use strict';

var QUnit = require('../../test/qunit');
var singleReference = require('./single-reference');

QUnit.module("can-util/js/single-reference");

QUnit.test("basics", function(assert){
  var obj = {};
  singleReference.set(obj, 'pet', 'dog');
  var retrieved = singleReference.getAndDelete(obj, 'pet');
  assert.equal(retrieved, 'dog', 'sets and retrieves successfully');
  assert.equal(Object.keys(obj).length, 0, 'also deletes when retrieved');
});
