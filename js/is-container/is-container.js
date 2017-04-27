'use strict';

// Returns `true` if the object can have properties (no `null`s).
module.exports = function (current) {
    return /^f|^o/.test(typeof current);
};