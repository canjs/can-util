module.exports = function(obj){
	for(var prop in obj) {
		return false;
	}
	return true;
}
