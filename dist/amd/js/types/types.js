/*can-util@3.0.0-pre.2#js/types/types*/
define(function (require, exports, module) {
    var isPromise = require('../is-promise/is-promise');
    var types = {
        isMapLike: function () {
            return false;
        },
        isListLike: function () {
            return false;
        },
        isPromise: function (obj) {
            return isPromise(obj);
        },
        isConstructor: function () {
            return false;
        },
        isCallableForValue: function (obj) {
            return typeof obj === 'function' && !types.isConstructor(obj);
        }
    };
    module.exports = types;
});