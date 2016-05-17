/*can-util@3.0.0-pre.17#js/is-browser-window/is-browser-window*/
define(function (require, exports, module) {
    module.exports = function () {
        return typeof window !== 'undefined' && typeof document !== 'undefined' && typeof SimpleDOM === 'undefined';
    };
});