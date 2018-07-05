/*can-util@3.11.7#js/is-empty-object/is-empty-object*/
define([
    'require',
    'exports',
    'module',
    'can-namespace'
], function (require, exports, module) {
    'use strict';
    var namespace = require('can-namespace');
    module.exports = namespace.isEmptyObject = function (obj) {
        for (var prop in obj) {
            return false;
        }
        return true;
    };
});