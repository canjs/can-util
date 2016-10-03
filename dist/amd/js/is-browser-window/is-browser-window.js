/*can-util@3.0.0-pre.62#js/is-browser-window/is-browser-window*/
define(function (require, exports, module) {
    (function (global) {
        module.exports = function () {
            return typeof window !== 'undefined' && typeof document !== 'undefined' && typeof SimpleDOM === 'undefined';
        };
    }(function () {
        return this;
    }()));
});