/*can-util@3.0.0-pre.0#js/is-empty-object/is-empty-object*/
module.exports = function (obj) {
    for (var prop in obj) {
        return false;
    }
    return true;
};