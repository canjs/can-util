var global = require("../../js/global/");

var setDocument;
module.exports = function(setDoc){
	if(setDoc) {
		setDocument = setDoc;
	}
	return setDocument || global().document
}
