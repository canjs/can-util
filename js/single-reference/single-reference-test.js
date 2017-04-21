'use strict';

var QUnit = require('../../test/qunit');
var singleReference = require('./single-reference');
var CID = require("../cid/get-cid");

QUnit.module("can-util/js/single-reference");

var obj = {};
var keyName;

QUnit.test("sets val to obj", 0, function(){
  QUnit.expect(1);
  singleReference.set(obj, 'pet', 'dog');
  keyName = CID('pet');
  QUnit.equal(obj[keyName], 'dog', 'sets val as property of obj');
});

QUnit.test("gets and deletes val from obj", 0, function(){
  QUnit.expect(2);
  var pet = singleReference.getAndDelete(obj, 'pet');
  QUnit.equal(pet, 'dog', 'gets val from obj');
  QUnit.equal(obj[keyName], undefined, 'removes val from obj when retrieved');
});

QUnit.test("overwrites values on object with same key", 0, function(){
  QUnit.expect(1);
  singleReference.set(obj, 'pet', 'dog');
  singleReference.set(obj, 'pet', 'monkey');
  var pet = singleReference.getAndDelete(obj, 'pet');
  QUnit.equal(pet, 'monkey', 'retrieves last value set at key');
});


QUnit.test("sets val to obj and successfully retrieves and deletes on getAndDelete", function() {

})
