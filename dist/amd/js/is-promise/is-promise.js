/*can-util@3.0.1#js/is-promise/is-promise*/
define(function (require, exports, module) {
    module.exports = function (obj) {
        return obj instanceof Promise || Object.prototype.toString.call(obj) === '[object Promise]';
    };
});