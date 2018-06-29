/*can-util@3.11.6#dom/dispatch/dispatch*/
define([
    'require',
    'exports',
    'module',
    '../events/events',
    'can-namespace'
], function (require, exports, module) {
    'use strict';
    var domEvents = require('../events/events');
    var namespace = require('can-namespace');
    module.exports = namespace.dispatch = function () {
        return domEvents.dispatch.apply(this, arguments);
    };
});