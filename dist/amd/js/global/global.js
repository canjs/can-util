/*can-util@3.0.0-pre.23#js/global/global*/
define(function (require, exports, module) {
    module.exports = function () {
        return typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope ? self : typeof process === 'object' && {}.toString.call(process) === '[object process]' ? global : window;
    };
});