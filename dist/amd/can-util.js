/*can-util@3.8.4#can-util*/
define(function (require, exports, module) {
    var deepAssign = require('./js/deep-assign/deep-assign');
    var omit = require('./js/omit/omit');
    var namespace = require('can-namespace');
    module.exports = deepAssign(namespace, require('./dom/dom'), omit(require('./js/js'), [
        'cid',
        'types'
    ]));
});