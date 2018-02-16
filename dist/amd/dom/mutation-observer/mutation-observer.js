/*can-util@3.11.2#dom/mutation-observer/mutation-observer*/
define([
    'require',
    'exports',
    'module',
    'can-globals'
], function (require, exports, module) {
    (function (global, require, exports, module) {
        'use strict';
        var globals = require('can-globals');
        module.exports = function (setMO) {
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