/*can-util@3.3.1#js/make-array/make-array*/
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