/*can-util@3.13.0#dom/document/document*/
define([
    'require',
    'exports',
    'module',
    'can-namespace',
    'can-globals/document'
], function (require, exports, module) {
    (function (global, require, exports, module) {
        'use strict';
        var namespace = require('can-namespace');
        module.exports = namespace.document = require('can-globals/document');
    }(function () {
        return this;
    }(), require, exports, module));
});