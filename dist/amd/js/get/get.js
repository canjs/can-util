/*can-util@3.13.0#js/get/get*/
define([
    'require',
    'exports',
    'module',
    '../is-container/is-container'
], function (require, exports, module) {
    'use strict';
    var isContainer = require('../is-container/is-container');
    function get(obj, name) {
        var parts = typeof name !== 'undefined' ? (name + '').replace(/\[/g, '.').replace(/]/g, '').split('.') : [], length = parts.length, current, i, container;
        if (!length) {
            return obj;
        }
        current = obj;
        for (i = 0; i < length && isContainer(current) && current !== null; i++) {
            container = current;
            current = container[parts[i]];
        }
        return current;
    }
    module.exports = get;
});