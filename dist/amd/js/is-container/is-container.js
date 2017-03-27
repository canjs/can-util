/*can-util@3.3.2#js/is-container/is-container*/
define(function (require, exports, module) {
    module.exports = function (current) {
        return /^f|^o/.test(typeof current);
    };
});