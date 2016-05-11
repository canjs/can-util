var extend = require('../deep-extend/deep-extend');

module.exports = exports = function(oldObject, newObject){
	var oldObjectClone,
		patches = [];

	// clone oldObject so properties can be deleted
	oldObjectClone = extend({}, oldObject);

	for (var newProp in newObject) {
		// look for added properties
		if (!oldObject || !oldObject.hasOwnProperty(newProp)) {
			patches.push({
				property: newProp,
				type: 'add',
				value: newObject[newProp]
			});
		// look for changed properties
		} else if (newObject[newProp] !== oldObject[newProp]) {
			patches.push({
				property: newProp,
				type: 'set',
				value: newObject[newProp]
			});
		}

		// delete properties found in newObject
		// so we can find removed properties
		delete oldObjectClone[newProp];
	}

	// loop over removed properties
	for (var oldProp in oldObjectClone) {
		patches.push({
			property: oldProp,
			type: 'remove'
		});
	}

	return patches;
};
