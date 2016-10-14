/*can-util@3.0.0#js/is-container/is-container*/
define(function (require, exports, module) {
    module.exports = function (current) {
        return /^f|^o/.test(typeof current);
    };
});