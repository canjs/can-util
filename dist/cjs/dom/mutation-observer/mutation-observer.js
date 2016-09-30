/*can-util@3.0.0-pre.16#dom/mutation-observer/mutation-observer*/
var global = require('../../js/global/global.js')();
var setMutationObserver;
module.exports = function (setMO) {
    if (setMO !== undefined) {
        setMutationObserver = setMO;
    }
    return setMutationObserver !== undefined ? setMutationObserver : global.MutationObserver || global.WebKitMutationObserver || global.MozMutationObserver;
};