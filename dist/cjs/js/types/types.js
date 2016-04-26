/*can-util@3.0.0-pre.9#js/types/types*/
var isPromise = require('../is-promise/is-promise.js');
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
    },
    isCompute: function (obj) {
        return obj && obj.isComputed;
    }
};
module.exports = types;