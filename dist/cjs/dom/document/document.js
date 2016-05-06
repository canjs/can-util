/*can-util@3.0.0-pre.14#dom/document/document*/
var global = require('../../js/global/global.js');
var setDocument;
module.exports = function (setDoc) {
    if (setDoc) {
        setDocument = setDoc;
    }
    return setDocument || global().document;
};