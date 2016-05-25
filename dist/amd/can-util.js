/*can-util@3.0.0-pre.25#can-util*/
define(function (require, exports, module) {
    var extend = require('./js/deep-extend/deep-extend');
    var namespace = require('./namespace');
    module.exports = extend(namespace, require('./dom/dom'), require('./js/js'));
});