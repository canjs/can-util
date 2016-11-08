/*can-util@3.0.8#js/is-container/is-container*/
define(function (require, exports, module) {
    module.exports = function (current) {
        return /^f|^o/.test(typeof current);
    };
});