/*can-util@3.0.12#dom/dispatch/dispatch*/
define(function (require, exports, module) {
    var domEvents = require('../events/events');
    module.exports = function () {
        return domEvents.dispatch.apply(this, arguments);
    };
});