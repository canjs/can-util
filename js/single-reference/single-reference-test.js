'use strict';

var QUnit = require('../../test/qunit');
var singleReference = require('./single-reference');

QUnit.module("can-util/js/single-reference");

QUnit.test("basics", function(){
  var obj = {};
  singleReference.set(obj, 'pet', 'dog');
  var retrieved = singleReference.getAndDelete(obj, 'pet');
  QUnit.equal(retrieved, 'dog', 'sets and retrieves successfully');
  QUnit.equal(Object.keys(obj).length, 0, 'also deletes when retrieved');
});
