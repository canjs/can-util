/*can-util@3.0.0-pre.26#js/is-empty-object/is-empty-object*/
define(function (require, exports, module) {
    module.exports = function (obj) {
        for (var prop in obj) {
            return false;
        }
        return true;
    };
});