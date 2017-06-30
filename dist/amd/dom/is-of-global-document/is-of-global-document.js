/*can-util@3.9.3#dom/is-of-global-document/is-of-global-document*/
define(function (require, exports, module) {
    'use strict';
    var getDocument = require('../document/document');
    module.exports = function (el) {
        return (el.ownerDocument || el) === getDocument();
    };
});