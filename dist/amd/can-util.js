/*can-util@3.11.5#can-util*/
define([
    'require',
    'exports',
    'module',
    'can-namespace',
    './js/js',
    './dom/dom'
], function (require, exports, module) {
    var namespace = require('can-namespace');
    require('./js/js');
    require('./dom/dom');
    module.exports = namespace;
});