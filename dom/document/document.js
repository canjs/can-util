var global = require("../../js/global/global");

var setDocument;
module.exports = function(setDoc){
	if(setDoc) {
		setDocument = setDoc;
	}
	return setDocument || global().document;
};
