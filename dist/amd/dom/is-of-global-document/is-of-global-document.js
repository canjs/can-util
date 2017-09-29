/*can-util@3.10.8#dom/is-of-global-document/is-of-global-document*/
define([
    'require',
    'exports',
    'module',
    'can-globals/document'
], function (require, exports, module) {
    (function (global) {
        'use strict';
        var getDocument = require('can-globals/document');
        module.exports = function (el) {
            return (el.ownerDocument || el) === getDocument();
        };
    }(function () {
        return this;
    }()));
});