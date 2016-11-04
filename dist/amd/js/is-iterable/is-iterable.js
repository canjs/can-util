/*can-util@3.0.6#js/is-iterable/is-iterable*/
define(function (require, exports, module) {
    var types = require('../types/types');
    module.exports = function (obj) {
        return obj && !!obj[types.iterator];
    };
});