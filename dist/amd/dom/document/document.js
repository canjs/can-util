/*can-util@3.9.0-pre.9#dom/document/document*/
define(function (require, exports, module) {
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