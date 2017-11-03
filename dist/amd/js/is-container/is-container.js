/*can-util@3.10.13#js/is-container/is-container*/
define(function (require, exports, module) {
    'use strict';
    module.exports = function (current) {
        return /^f|^o/.test(typeof current);
    };
});