/* global self */
/* global WorkerGlobalScope */
module.exports = function(){
	return typeof window !== "undefined" ? window :
		(typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope) ? self : global;
};
