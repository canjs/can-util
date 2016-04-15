/* global self */
/* global WorkerGlobalScope */
module.exports = function(){
	var global = typeof window !== "undefined" ? window :
		(typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope) ? self : global;
};
