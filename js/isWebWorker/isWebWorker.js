module.exports = function(){
	return typeof WorkerGlobalScope !== "undefined" &&
	(self instanceof WorkerGlobalScope);
}
