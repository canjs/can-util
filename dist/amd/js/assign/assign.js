/*can-util@3.9.0-pre.7#js/assign/assign*/
define(function (require, exports, module) {
    module.exports = function (d, s) {
        for (var prop in s) {
            d[prop] = s[prop];
        }
        return d;
    };
});