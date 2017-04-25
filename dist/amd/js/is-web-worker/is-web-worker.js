/*can-util@3.4.0#js/is-web-worker/is-web-worker*/
define(function (require, exports, module) {
    (function (global) {
        'use strict';
        module.exports = function () {
            return typeof WorkerGlobalScope !== 'undefined' && this instanceof WorkerGlobalScope;
        };
    }(function () {
        return this;
    }()));
});