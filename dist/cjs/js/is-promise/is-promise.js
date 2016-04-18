/*can-util@3.0.0-pre.0#js/is-promise/is-promise*/
var isFunction = require('../is-function/is-function.js');
module.exports = function (obj) {
    return !!obj && (window.Promise && obj instanceof Promise || isFunction(obj.then) && isFunction(obj.catch));
};