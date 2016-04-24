/*can-util@3.0.0-pre.2#js/global/global*/
define(function (require, exports, module) {
    module.exports = function () {
        return typeof window !== 'undefined' ? window : typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope ? self : global;
    };
});