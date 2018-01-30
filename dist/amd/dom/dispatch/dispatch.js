/*can-util@3.11.1#dom/dispatch/dispatch*/
define([
    'require',
    'exports',
    'module',
    '../events/events'
], function (require, exports, module) {
    'use strict';
    var domEvents = require('../events/events');
    module.exports = function () {
        return domEvents.dispatch.apply(this, arguments);
    };
});