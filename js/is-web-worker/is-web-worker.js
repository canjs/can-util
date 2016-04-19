/* globals WorkerGlobalScope */
module.exports = function(){
	return typeof WorkerGlobalScope !== "undefined" &&
		(this instanceof WorkerGlobalScope);
};
