import CID from "../cid/get-cid.js";

let _moduleExports;

export default _moduleExports;

var singleReference;

// weak maps are slow
/* if(typeof WeakMap !== "undefined") {
	var globalMap = new WeakMap();
	singleReference = {
		set: function(obj, key, value){
			var localMap = globalMap.get(obj);
			if( !localMap ) {
				globalMap.set(obj, localMap = new WeakMap());
			}
			localMap.set(key, value);
		},
		getAndDelete: function(obj, key){
			return globalMap.get(obj).get(key);
		},
		references: globalMap
	};
} else {*/
// can-util/js/single-reference/single-reference
singleReference = {
	// obj is a function ... we need to place `value` on it so we can retreive it
	// we can't use a global map
	set: function (obj, key, value) {
		// check if it has a single reference map
		var keyName = CID(key);
		obj[keyName] = value;
	},

	getAndDelete: function (obj, key) {
		var cid = CID(key);
		var value = obj[cid];
		delete obj[cid];
		return value;
	}
};
//}

_moduleExports = singleReference;