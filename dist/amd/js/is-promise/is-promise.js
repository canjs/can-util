/*can-util@3.0.0-pre.29#js/is-promise/is-promise*/
define(function (require, exports, module) {
    module.exports = function (obj) {
        return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
    };
});