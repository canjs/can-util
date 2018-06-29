/*can-util@3.11.6#dom/mutation-observer/mutation-observer*/
define([
    'require',
    'exports',
    'module',
    'can-globals',
    'can-namespace'
], function (require, exports, module) {
    (function (global, require, exports, module) {
        'use strict';
        var globals = require('can-globals');
        var namespace = require('can-namespace');
        module.exports = namespace.mutationObserver = function (setMO) {
            if (setMO !== undefined) {
                globals.setKeyValue('MutationObserver', function () {
                    return setMO;
                });
            }
            return globals.getKeyValue('MutationObserver');
        };
    }(function () {
        return this;
    }(), require, exports, module));
});