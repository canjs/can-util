/*can-util@3.11.5#dom/matches/matches*/
define([
    'require',
    'exports',
    'module',
    'can-namespace'
], function (require, exports, module) {
    'use strict';
    var namespace = require('can-namespace');
    var matchesMethod = function (element) {
        return element.matches || element.webkitMatchesSelector || element.webkitMatchesSelector || element.mozMatchesSelector || element.msMatchesSelector || element.oMatchesSelector;
    };
    module.exports = namespace.matches = function () {
        var method = matchesMethod(this);
        return method ? method.apply(this, arguments) : false;
    };
});