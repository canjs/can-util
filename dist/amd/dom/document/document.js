/*can-util@3.9.9#dom/document/document*/
define([
    'require',
    'exports',
    'module',
    '../../js/global/global'
], function (require, exports, module) {
    (function (global) {
        'use strict';
        var global = require('../../js/global/global');
        var setDocument;
        module.exports = function (setDoc) {
            if (setDoc) {
                setDocument = setDoc;
            }
            return setDocument || global().document;
        };
    }(function () {
        return this;
    }()));
});