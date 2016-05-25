/*can-util@3.0.0-pre.24#js/set-immediate/set-immediate*/
define(function (require, exports, module) {
    var global = require('../global/global')();
    module.exports = global.setImmediate || function (cb) {
        return setTimeout(cb, 0);
    };
});