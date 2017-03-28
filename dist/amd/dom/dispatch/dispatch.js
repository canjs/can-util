/*can-util@3.3.4#dom/dispatch/dispatch*/
define(function (require, exports, module) {
    var domEvents = require('../events/events');
    module.exports = function () {
        return domEvents.dispatch.apply(this, arguments);
    };
});