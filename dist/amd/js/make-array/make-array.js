/*can-util@3.0.0-pre.43#js/make-array/make-array*/
define(function (require, exports, module) {
    var each = require('../each/each');
    function makeArray(arr) {
        var ret = [];
        each(arr, function (a, i) {
            ret[i] = a;
        });
        return ret;
    }
    module.exports = makeArray;
});