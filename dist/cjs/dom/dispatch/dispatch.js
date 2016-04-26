/*can-util@3.0.0-pre.9#dom/dispatch/dispatch*/
var assign = require('../../js/assign/assign.js');
var _document = require('../document/document.js');
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