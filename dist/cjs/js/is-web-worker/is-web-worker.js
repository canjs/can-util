/*can-util@3.0.0-pre.0#js/is-web-worker/is-web-worker*/
module.exports = function () {
    return typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope;
};