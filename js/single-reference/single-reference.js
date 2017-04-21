// can-util/js/single-reference/single-reference
var CID = require("../cid/get-cid");

var singleReference = {
    // obj is a function ... we need to place `value` on it so we can retreive it
    // we can't use a global map
    set: function(obj, key, value){
       // check if it has a single reference map
       var keyName = CID(key);
       obj[keyName] = value;
       console.log(keyName + 'keyName');
       console.log(obj + '\n');
    },

    getAndDelete: function(obj, key){
       var cid = CID(key);
       var value = obj[cid];
       delete obj[cid];
       return value;
    }
};

module.exports = singleReference;
