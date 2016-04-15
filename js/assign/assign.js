module.exports = function (d, s) {
	for (var prop in s) {
		d[prop] = s[prop];
	}
	return d;
};
