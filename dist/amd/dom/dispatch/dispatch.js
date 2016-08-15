/*can-util@3.0.0-pre.33#dom/dispatch/dispatch*/
define(function (require, exports, module) {
    var assign = require('../../js/assign/assign');
    var _document = require('../document/document');
    module.exports = function (event, args, bubbles) {
        var doc = _document();
        var ev = doc.createEvent('HTMLEvents');
        var isString = typeof event === 'string';
        ev.initEvent(isString ? event : event.type, bubbles === undefined ? true : bubbles, false);
        if (!isString) {
            assign(ev, event);
        }
        ev.args = args;
        return this.dispatchEvent(ev);
    };
});