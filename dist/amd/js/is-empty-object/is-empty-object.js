/*can-util@3.0.0-pre.61#js/is-empty-object/is-empty-object*/
define(function (require, exports, module) {
    module.exports = function (obj) {
        for (var prop in obj) {
            return false;
        }
        return true;
    };
});