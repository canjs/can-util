import QUnit from '../../test/qunit.js';
import isContainer from './is-container.js';

QUnit.module('can-util/js/is-container');

QUnit.test("object", function () {
    ok(isContainer({ "a": 1 }));
});

QUnit.test("function", function () {
    var sum = function (num1, num2) {
        return num1 + num2;
    };

    ok(isContainer(sum));
});

QUnit.test("NaN and undefined is not a container", function () {
    ok(!isContainer(NaN));
    ok(!isContainer());
});