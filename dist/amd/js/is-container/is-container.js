/*can-util@3.10.10#js/is-container/is-container*/
define(function (require, exports, module) {
    'use strict';
    module.exports = function (current) {
        return /^f|^o/.test(typeof current);
    };
});