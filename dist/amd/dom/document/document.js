/*can-util@3.0.0-pre.26#dom/document/document*/
define(function (require, exports, module) {
    var global = require('../../js/global/global');
    var setDocument;
    module.exports = function (setDoc) {
        if (setDoc) {
            setDocument = setDoc;
        }
        return setDocument || global().document;
    };
});