'use strict';

var canDev = require("can-log/dev/dev");

/**
 * @module can-util/js/parse-uri/parse-uri parse-uri
 * @parent can-util/js
 * @description Deprecated. Use [can-parse-uri] instead.
 */

 //!steal-remove-start
 canDev.warn('js/parse-uri/parse-uri is deprecated; please use can-parse-uri instead: https://github.com/canjs/can-parse-uri');
 //!steal-remove-end

module.exports = require('can-parse-uri');
