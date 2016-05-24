/* global self */
/* global WorkerGlobalScope */
module.exports = function(){
	// Web Worker
	return (typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope) ? self :

		// Node.js
		typeof process === "object" &&
		{}.toString.call(process) === "[object process]" ? global :
		
		// Browser window
		window;
};
