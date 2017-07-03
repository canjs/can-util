/*can-util@3.9.4#js/is-empty-object/is-empty-object*/
define(function (require, exports, module) {
    'use strict';
    module.exports = function (obj) {
        for (var prop in obj) {
            return false;
        }
        return true;
    };
});