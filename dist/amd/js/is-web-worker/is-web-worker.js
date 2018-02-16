/*can-util@3.11.2#js/is-web-worker/is-web-worker*/
define(function (require, exports, module) {
    (function (global, require, exports, module) {
        'use strict';
        module.exports = function () {
            return typeof WorkerGlobalScope !== 'undefined' && this instanceof WorkerGlobalScope;
        };
    }(function () {
        return this;
    }(), require, exports, module));
});