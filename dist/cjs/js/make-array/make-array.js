/*can-util@3.0.0-pre.8#js/make-array/make-array*/
var each = require('../each/each.js');
function makeArray(arr) {
    var ret = [];
    each(arr, function (a, i) {
        ret[i] = a;
    });
    return ret;
}
module.exports = makeArray;