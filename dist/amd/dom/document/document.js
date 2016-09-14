/*can-util@3.0.0-pre.43#dom/document/document*/
define(function (require, exports, module) {
    (function (global) {
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