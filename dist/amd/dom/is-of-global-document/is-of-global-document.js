/*can-util@3.13.0#dom/is-of-global-document/is-of-global-document*/
define([
    'require',
    'exports',
    'module',
    'can-globals/document',
    'can-namespace'
], function (require, exports, module) {
    (function (global, require, exports, module) {
        'use strict';
        var getDocument = require('can-globals/document');
        var namespace = require('can-namespace');
        module.exports = namespace.isOfGlobalDocument = function (el) {
            return (el.ownerDocument || el) === getDocument();
        };
    }(function () {
        return this;
    }(), require, exports, module));
});