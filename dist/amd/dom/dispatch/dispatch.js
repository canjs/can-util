/*can-util@3.9.0-pre.2#dom/dispatch/dispatch*/
define(function (require, exports, module) {
    'use strict';
    var domEvents = require('../events/events');
    module.exports = function () {
        return domEvents.dispatch.apply(this, arguments);
    };
});