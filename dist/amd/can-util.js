/*can-util@3.10.5#can-util*/
define([
    'require',
    'exports',
    'module',
    './js/deep-assign/deep-assign',
    './js/omit/omit',
    'can-namespace',
    './dom/dom',
    './js/js'
], function (require, exports, module) {
    var deepAssign = require('./js/deep-assign/deep-assign');
    var omit = require('./js/omit/omit');
    var namespace = require('can-namespace');
    module.exports = deepAssign(namespace, require('./dom/dom'), omit(require('./js/js'), [
        'cid',
        'types'
    ]));
});