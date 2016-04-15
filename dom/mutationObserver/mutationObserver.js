var global = require("../../js/global/")();
module.exports = function(){
	return global.MutationObserver || global.WebKitMutationObserver || global.MozMutationObserver
};
