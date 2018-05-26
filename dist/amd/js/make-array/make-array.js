/*can-util@3.11.5#js/make-array/make-array*/
define([
    'require',
    'exports',
    'module',
    '../each/each',
    '../is-array-like/is-array-like',
    'can-namespace'
], function (require, exports, module) {
    'use strict';
    var each = require('../each/each');
    var isArrayLike = require('../is-array-like/is-array-like');
    var namespace = require('can-namespace');
    function makeArray(element) {
        var ret = [];
        if (isArrayLike(element)) {
            each(element, function (a, i) {
                ret[i] = a;
            });
        } else if (element === 0 || element) {
            ret.push(element);
        }
        return ret;
    }
    module.exports = namespace.makeArray = makeArray;
});