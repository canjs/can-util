/*can-util@3.11.7#can-util*/
define([
    'require',
    'exports',
    'module',
    'can-namespace',
    './js/js',
    './dom/dom'
], function (require, exports, module) {
    'use strict';
    var namespace = require('can-namespace');
    require('./js/js');
    require('./dom/dom');
    module.exports = namespace;
});