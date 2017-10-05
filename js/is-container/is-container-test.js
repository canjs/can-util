'use strict';

var QUnit = require('../../test/qunit');

var isContainer  = require('./is-container');

QUnit.module('can-util/js/is-container');

QUnit.test("object", function(assert){
	assert.ok(isContainer({"a":1}));
});

QUnit.test("function", function(assert){
    var sum = function(num1, num2){
        return num1 + num2;
    };
    
	assert.ok(isContainer(sum));
});

QUnit.test("NaN and undefined is not a container", function(assert){
    assert.ok(!isContainer(NaN));
    assert.ok(!isContainer());
});
