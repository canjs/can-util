/*can-util@3.0.0-pre.14#js/is-web-worker/is-web-worker*/
module.exports = function () {
    return typeof WorkerGlobalScope !== 'undefined' && this instanceof WorkerGlobalScope;
};