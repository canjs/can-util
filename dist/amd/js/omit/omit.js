/*can-util@3.0.13#js/omit/omit*/
define(function (require, exports, module) {
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