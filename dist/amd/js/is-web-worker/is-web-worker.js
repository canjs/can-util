/*can-util@3.0.0-pre.18#js/is-web-worker/is-web-worker*/
define(function (require, exports, module) {
    module.exports = function () {
        return typeof WorkerGlobalScope !== 'undefined' && this instanceof WorkerGlobalScope;
    };
});