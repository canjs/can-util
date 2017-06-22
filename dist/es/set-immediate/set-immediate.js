import _globalGlobal from "../global/global.js";

let _moduleExports;

export default _moduleExports;

var global = _globalGlobal();

/**
 * @module can-util/js/set-immediate/set-immediate set-immediate
 * @parent can-util/js
 * @signature `setImmediate(function())`
 * @param  {Function} cb
 *
 * Polyfill for setImmediate() if it doesn't exist in the global context
 */
_moduleExports = global.setImmediate || function (cb) {
  return setTimeout(cb, 0);
};