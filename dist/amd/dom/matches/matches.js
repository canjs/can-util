/*can-util@3.0.0-pre.8#dom/matches/matches*/
define(function (require, exports, module) {
    var matchesMethod = function (element) {
        return element.matches || element.webkitMatchesSelector || element.webkitMatchesSelector || element.mozMatchesSelector || element.msMatchesSelector || element.oMatchesSelector;
    };
    module.exports = function () {
        return matchesMethod(this).apply(this, arguments);
    };
});