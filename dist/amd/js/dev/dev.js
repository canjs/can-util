/*can-util@3.4.1#js/dev/dev*/
define(function (require, exports, module) {
    'use strict';
    var canLog = require('../log/log');
    module.exports = {
        warnTimeout: 5000,
        logLevel: 0,
        warn: function () {
        },
        log: function () {
        },
        error: function () {
        },
        _logger: canLog._logger
    };
});