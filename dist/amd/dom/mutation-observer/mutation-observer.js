/*can-util@3.9.0-pre.4#dom/mutation-observer/mutation-observer*/
define(function (require, exports, module) {
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