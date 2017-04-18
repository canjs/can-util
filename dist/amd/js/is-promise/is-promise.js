/*can-util@3.3.6#js/is-promise/is-promise*/
define(function (require, exports, module) {
    var types = require('can-types');
    module.exports = function (obj) {
        return types.isPromise(obj);
    };
});