/*can-util@3.3.0#js/is-empty-object/is-empty-object*/
define(function (require, exports, module) {
    module.exports = function (obj) {
        for (var prop in obj) {
            return false;
        }
        return true;
    };
});