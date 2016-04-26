/*can-util@3.0.0-pre.8#js/assign/assign*/
module.exports = function (d, s) {
    for (var prop in s) {
        d[prop] = s[prop];
    }
    return d;
};