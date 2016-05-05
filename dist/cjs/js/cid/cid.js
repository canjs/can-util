/*can-util@3.0.0-pre.13#js/cid/cid*/
var cid = 0;
module.exports = function (object, name) {
    if (!object._cid) {
        cid++;
        object._cid = (name || '') + cid;
    }
    return object._cid;
};