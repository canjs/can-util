/*can-util@3.0.0-pre.0#dom/is-of-global-document/is-of-global-document*/
var getDocument = require('../document/document.js');
module.exports = function (el) {
    return (el.ownerDocument || el) === getDocument();
};