/*can-util@3.1.1#js/dev/dev*/
define(function (require, exports, module) {
    var canLog = require('../log/log');
    module.exports = {
        warnTimeout: 5000,
        logLevel: 0,
        warn: function () {
        },
        log: function () {
        },
        _logger: canLog._logger
    };
});