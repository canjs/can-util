/*can-util@3.0.0-pre.13#js/is-promise/is-promise*/
define(function (require, exports, module) {
    var isFunction = require('../is-function/is-function');
    module.exports = function (obj) {
        return !!obj && (typeof window !== 'undefined' && window.Promise && obj instanceof Promise || isFunction(obj.then) && isFunction(obj.catch));
    };
});