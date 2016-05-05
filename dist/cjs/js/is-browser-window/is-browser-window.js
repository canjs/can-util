/*can-util@3.0.0-pre.12#js/is-browser-window/is-browser-window*/
module.exports = function () {
    return typeof window !== 'undefined' && typeof document !== 'undefined' && typeof SimpleDOM === 'undefined';
};