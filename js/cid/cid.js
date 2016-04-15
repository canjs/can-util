var cid = 0;
module.exports = function (object, name) {
	if (!object._cid) {
		cid++;
		object._cid = (name || '') + cid;
	}
	return object._cid;
};
