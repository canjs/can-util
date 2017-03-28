/*can-util@3.3.3#dom/is-of-global-document/is-of-global-document*/
define(function (require, exports, module) {
    var getDocument = require('../document/document');
    module.exports = function (el) {
        return (el.ownerDocument || el) === getDocument();
    };
});