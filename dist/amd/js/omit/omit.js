/*can-util@3.9.0-pre.7#js/omit/omit*/
define(function (require, exports, module) {
    'use strict';
    module.exports = function (source, propsToOmit) {
        var result = {};
        for (var prop in source) {
            if (propsToOmit.indexOf(prop) < 0) {
                result[prop] = source[prop];
            }
        }
        return result;
    };
});