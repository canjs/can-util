/*can-util@3.0.0-pre.5#js/set-immediate/set-immediate*/
var global = require('../global/global.js')();
module.exports = global.setImmediate || function (cb) {
    return setTimeout(cb, 0);
};