/*can-util@3.3.1#js/omit/omit*/
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