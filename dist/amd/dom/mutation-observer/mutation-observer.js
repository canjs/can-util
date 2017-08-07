/*can-util@3.10.0-pre.0#dom/mutation-observer/mutation-observer*/
define([
    'require',
    'exports',
    'module',
    '../../js/global/global'
], function (require, exports, module) {
    (function (global) {
        'use strict';
        var global = require('../../js/global/global')();
        var setMutationObserver;
        module.exports = function (setMO) {
            if (setMO !== undefined) {
                setMutationObserver = setMO;
            }
            return setMutationObserver !== undefined ? setMutationObserver : global.MutationObserver || global.WebKitMutationObserver || global.MozMutationObserver;
        };
    }(function () {
        return this;
    }()));
});