/*can-util@3.0.0-pre.58#can-util*/
define(function (require, exports, module) {
    var deepAssign = require('./js/deep-assign/deep-assign');
    var namespace = require('./namespace');
    module.exports = deepAssign(namespace, require('./dom/dom'), require('./js/js'));
});